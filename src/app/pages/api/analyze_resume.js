export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("resume");
    if (file instanceof File) {
      const resumeText = Buffer.from(await file.arrayBuffer()).toString("utf8");

      // Check spelling and grammar
      const grammarCheckResult = grammar.check(resumeText);

      // Analyze other criteria
      const isValid = analyzeResumeCriteria(resumeText);

      return Response.json({ isValid, grammarCheckResult });
    }
    // Use multer to handle the file upload
  } catch (error) {
    console.error(error, "test");
    return Response.json(
      { error: "Internal Server Error Test" },
      { status: 500 },
    );
  }
}