// // app/api/uploadthing/core.ts
// import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { type NextRequest } from "next/server";

// const f = createUploadthing();

// export const ourFileRouter = {
//   imageUploader: f({ image: { maxFileSize: "4MB" } })
//     .onUploadComplete(async ({ file }) => {
//       console.log("✅ Uploaded file:", file.url);
//       // You can store this in MongoDB if needed
//     }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
