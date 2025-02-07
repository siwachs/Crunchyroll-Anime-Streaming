import CreateSeasonForm from "./_components/createSeasonForm";

export default async function CreateSeason({
  params,
}: Readonly<{
  params: Promise<{ seriesId: string }>;
}>) {
  const seriesId = (await params).seriesId;

  return (
    <div className="my-6">
      <CreateSeasonForm
        cmsURL={process.env.CMS_SERVER as string}
        seriesId={seriesId}
      />
    </div>
  );
}
