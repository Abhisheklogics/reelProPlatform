
import { connectToDatabase } from "@/lib/db";
import Video from "@/model/video.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
export async function GET() {
    try {
        await connectToDatabase()
       let allVideos=await Video.find({}).sort({createdAt:-1}).lean()

       if(!allVideos || allVideos.length==0){
         return NextResponse.json([],{
            status:400
         })
       }

       return NextResponse.json(allVideos)
    } catch (error) {
        return NextResponse.json(
            {error:'video not found'},
            {
            status:500
         }) 
    }
}

export async function POST(request) {
 try {
   const session =  await getServerSession(authOptions)

   if(!session)
   {
    return NextResponse.json({error:'Unathorized request'},{
        status:400
    })
   }

   await connectToDatabase()

   const body = await request.json()

   let videoData={
    ...body,
    controls:body?.controls ?? true,
    transformation:{
  width: 1080,
  height: 1920,
  quality: body.transformation?.quality ?? 100
}
   }

   let newVideo=await Video.create(videoData)
return NextResponse.json(newVideo)
 } catch (error) {
      return NextResponse.json({error:'Unathorized request'},{
        status:400
    })
 }    
}