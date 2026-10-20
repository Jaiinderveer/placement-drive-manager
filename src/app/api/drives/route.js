import prisma from "../../../lib/prisma";

const allowedTypes = ["Internship","Full-Time","Other"]

export async function GET(){
    try{
        const drives = await prisma.placementDrive.findMany({
                orderBy:{
                    driveDate: "asc"
                }
            }
        );
        return Response.json(drives)
    }catch(err){
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(request){
    try{
        const data = await request.json();
        const date = new Date(data.driveDate);
        if (!data.companyName || !data.role || isNaN(date.getTime()) || !data.eligibleBranch){
            return Response.json(
                { error: "Required fields are missing or the date is invalid" },
                { status: 400 }
            );
        }
        if (data.minCGPA !== undefined && (!Number.isFinite(data.minCGPA) || data.minCGPA > 10 || data.minCGPA < 0)){
            return Response.json(
                { error: "Given CGPA is Invalid"},
                { status: 400 }
            );
        }
        if(data.jobType !== undefined && !allowedTypes.includes(data.jobType)){
            return Response.json(
                { error: "Given JobType is Invalid"},
                { status: 400 }
            );
            
        }
        const newDrive = await prisma.placementDrive.create({
            data:{
                companyName: data.companyName,
                role: data.role,
                driveDate:date,
                eligibleBranch: data.eligibleBranch,
                minCGPA: data.minCGPA,
                jobType: data.jobType
            }
        })
        return Response.json(newDrive,{status:201});
    }catch(err){
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}