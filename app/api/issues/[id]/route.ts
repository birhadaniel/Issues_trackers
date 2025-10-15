import { IssueSchema } from "@/lib/validation";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'


export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string } }
){
    const session = await getServerSession(authOptions);
    if(!session)
      return NextResponse.json({}, { status: 401});

    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if(!validation.success) 
        return new Response(validation.error.message, { status: 400 })
        
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }

    });

    if(!issue) 
        return  NextResponse.json({error:"Issue not found"}, { status: 404 })

    const updateIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    });

   return NextResponse.json(updateIssue);

}

export async function DELETE(
    request: NextRequest, 
    { params }: { params: { id: string } }
){
    const session = await getServerSession(authOptions);
    if(!session)
      return NextResponse.json({}, { status: 401});

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!issue) 
        return  NextResponse.json({error:"Issue not found"}, { status: 404 })

    await prisma.issue.delete({
        where: { id: issue.id }
    });

    return NextResponse.json({});
}

