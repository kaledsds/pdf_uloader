import { type NextPage } from "next";
import Head from "next/head";
import { useState, type FormEvent } from "react";
import { uploadPDFService } from "~/services/uploadPDF";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const createResume = api.resume.createResume.useMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Prevent Defaults
    e.preventDefault();
    // If File Not Selected
    if (!selectedFile) {
      return;
    }
    // Start Loading
    setIsLoading(true);
    // Upload The File
    const url = await uploadPDFService(selectedFile);
    if (url) {
      // Create Resume
      createResume.mutate({ url });
    }
  };

  return (
    <>
      <Head>
        <title>PDF Uploader</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center justify-center gap-6 bg-slate-700 text-slate-200">
        <p className="text-2xl font-bold">Please Upload Your PDF...</p>
        <form
          onSubmit={(e) => void onSubmit(e)}
          className="flex flex-col gap-4"
        >
          {/* File Input */}
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
          {/* Submit btn */}
          <button className="rounded-lg bg-slate-900 px-4 py-2 hover:bg-slate-200 hover:text-slate-700">
            Upload
          </button>
        </form>
        {isLoading && <p>Loading ...</p>}
      </main>
    </>
  );
};

export default Home;