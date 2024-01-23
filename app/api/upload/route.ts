import { promises as fsPromises } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file");

  if (!(file instanceof File)) {
    return new Response("Invalid file type", { status: 400 });
  }

  console.log(file);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("/", "tmp", file.name);

  try {
    await fsPromises.writeFile(path, buffer);
    console.log("File written to disk:", path);
    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error writing file:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
