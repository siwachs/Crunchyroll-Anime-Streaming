"use client";

import { useState, FormEvent } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import "@/app/(admin)/cms/cms.css";

const CreateSeasonForm: React.FC<{ cmsURL: string; seriesId: string }> = ({
  cmsURL,
  seriesId,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createSeason(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const title = (
      form.elements.namedItem("title") as HTMLInputElement
    ).value.trim();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${cmsURL}/seasons/${seriesId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const parsedResponse = await response.json();

        const error = parsedResponse.message || "Failed to create season!";
        setError(Array.isArray(error) ? error.join(", ") : error);
      } else {
        form.reset();
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("An unknown error occurred!");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={createSeason} className="form" autoComplete="on">
      <label htmlFor="title" className="input-label">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        required
        className="input"
        autoComplete="on"
      />

      <div className="mt-6 flex justify-end">
        <button
          title={loading ? "Creating..." : "Create"}
          type="submit"
          disabled={loading}
          className="create-button"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="size-6.5 animate-spin" />
          ) : (
            "Create"
          )}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default CreateSeasonForm;
