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
    }catch{
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(request){
    try{
        let data;

        try {
            data = await request.json();
        } catch {
            return Response.json(
                { error: "Invalid JSON request body" },
                { status: 400 }
            );
        }

        if (!data || typeof data !== "object" || Array.isArray(data)) {
            return Response.json(
                { error: "Request body must be a JSON object" },
                { status: 400 }
            );
        }
        const date = new Date(data.driveDate);
        if (
            typeof data.companyName !== "string" ||
            !data.companyName.trim() ||
            typeof data.role !== "string" ||
            !data.role.trim() ||
            typeof data.eligibleBranch !== "string" ||
            !data.eligibleBranch.trim() ||
            typeof data.driveDate !== "string" ||
            !data.driveDate.trim() ||
            Number.isNaN(date.getTime())
        ) {
            return Response.json(
                {
                    error:
                        "Company name, role, eligible branch, and a valid drive date are required",
                },
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
    }catch{
        return Response.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}