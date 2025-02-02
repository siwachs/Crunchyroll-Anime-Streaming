"use client";

import {
  useState,
  MouseEvent,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { getAttribute } from "@/lib/utils";

import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import "./index.css";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_SIZE = 6 * 1024 * 1024;

const ImageInput: React.FC<{
  label: string;
  name: string;
  required?: boolean;
  className?: string;
}> = ({ label, name, required = false, className }) => {
  function validateImage(e: ChangeEvent<HTMLInputElement>) {
    const selectedImage = e.target.files?.[0];

    if (
      selectedImage &&
      !ALLOWED_TYPES.includes(selectedImage.type) &&
      selectedImage.size <= MAX_IMAGE_SIZE
    ) {
      alert(`${selectedImage.name} is Invalid!`);
      e.target.value = "";
    }
  }

  return (
    <div className={className}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>

      <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto size-12 text-white"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input
            className="relative cursor-pointer rounded-md bg-white p-1.5 font-medium text-indigo-600"
            id={name}
            name={name}
            type="file"
            accept="image/*"
            required={required}
            onChange={validateImage}
          />

          <p className="mt-0.5 text-sm select-none">
            Upload a image of type JPG, JPEG, PNG, WEBP or GIF of Upto 6MB
          </p>
        </div>
      </div>
    </div>
  );
};

const DetailInput: React.FC<{
  id: number;
  setDetailIds: Dispatch<SetStateAction<number[]>>;
}> = ({ id, setDetailIds }) => {
  function addDetailInput() {
    setDetailIds((prev) => [...prev, Date.now()]);
  }

  function removeDetailInput(e: MouseEvent) {
    const dataId = parseInt(getAttribute(e, "button", "data-id"));

    setDetailIds((prev) => prev.filter((index) => index !== dataId));
  }

  return (
    <div
      key={id}
      className="relative mb-2.5 grid grid-cols-1 gap-4 rounded-md border border-gray-300 px-4 py-2 md:grid-cols-2"
    >
      <div>
        <label htmlFor={`detail-key-${id}`} className="input-label">
          Key
        </label>
        <input
          id={`detail-key-${id}`}
          name={`detail-key-${id}`}
          type="text"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor={`detail-value-${id}`} className="input-label">
          Value
        </label>
        <input
          id={`detail-value-${id}`}
          name={`detail-value-${id}`}
          type="text"
          required
          className="input"
        />
      </div>

      {id === 0 ? (
        <button
          type="button"
          onClick={addDetailInput}
          className="absolute top-1.5 right-1.5 text-indigo-600"
        >
          <FaPlus className="size-4.5" />
        </button>
      ) : (
        <button
          type="button"
          data-id={id}
          onClick={removeDetailInput}
          className="absolute top-1.5 right-1.5 text-red-600"
        >
          <FaMinus className="size-4.5" />
        </button>
      )}
    </div>
  );
};

const CreateSeriesForm: React.FC<{
  cmsURL: string;
  metaTags: { id: string; title: string }[];
  genres: { id: string; title: string }[];
}> = ({ cmsURL, metaTags, genres }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [detailIds, setDetailIds] = useState<number[]>([0]);

  async function createSeries(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const appendFile = (name: string) => {
      const file = form[name]?.files?.[0];

      formData.set(name, file);
    };

    appendFile("banner.name");
    appendFile("banner.tall");
    appendFile("banner.wide");
    appendFile("poster.tall");
    appendFile("poster.wide");

    formData.set("title", (formData.get("title") as string).trim());
    formData.set("licence", (formData.get("licence") as string).trim());
    formData.set("description", (formData.get("description") as string).trim());

    const appendMultiSelect = (name: string) => {
      const values = formData.getAll(name) as string[];

      formData.delete(name);
      formData.append(name, JSON.stringify(values));
    };

    appendMultiSelect("metaTags");
    appendMultiSelect("genres");

    const details: Record<string, string> = {};
    detailIds.forEach((detailId) => {
      const key = `detail-key-${detailId}`;
      const value = `detail-value-${detailId}`;

      details[(formData.get(key) as string).trim()] = (
        formData.get(value) as string
      ).trim();

      formData.delete(key);
      formData.delete(value);
    });

    formData.append("details", JSON.stringify(details));
    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Log each key-value pair
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${cmsURL}/series`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const parsedResponse = await response.json();

        const error = parsedResponse.message || "Failed to create series!";
        setError(Array.isArray(error) ? error.join(", ") : error);
      } else {
        setDetailIds([0]);
        form.reset();
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError("An unknown error occurred!");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={createSeries}
      className="mx-auto w-full max-w-4xl rounded-md bg-[var(--app-overlay-secondary)] p-6"
      autoComplete="on"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ImageInput name="banner.name" label="Banner Name" required />
        <ImageInput name="banner.tall" label="Banner Tall" />
        <ImageInput name="banner.wide" label="Banner Wide" required />
        <ImageInput name="poster.tall" label="Poster Tall" />
        <ImageInput
          name="poster.wide"
          label="Poster Wide"
          required
          className="md:col-span-2"
        />

        <div className="md:col-span-2">
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
        </div>

        <div>
          <label htmlFor="metaTags" className="input-label">
            Meta Tags
          </label>
          <select
            id="metaTags"
            name="metaTags"
            multiple
            required
            className="input select"
            autoComplete="off"
          >
            {metaTags.map((metaTag) => (
              <option key={metaTag.id} value={metaTag.id}>
                {metaTag.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            spellCheck="true"
            rows={7}
            className="input text-area"
            autoComplete="on"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="genres" className="input-label">
            Genres
          </label>
          <select
            id="genres"
            name="genres"
            multiple
            required
            className="input select"
            autoComplete="off"
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <span className="input-label">Details</span>

          {detailIds.map((id) => (
            <DetailInput key={id} id={id} setDetailIds={setDetailIds} />
          ))}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="licence" className="input-label">
            Licence
          </label>
          <input
            id="licence"
            name="licence"
            type="text"
            required
            className="input"
            autoComplete="on"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          title={loading ? "Creating..." : "Create"}
          type="submit"
          disabled={loading}
          className="app-transition-colors flex min-h-11 min-w-28 items-center justify-center rounded-md bg-[var(--app-background-crunchyroll-orange)] text-lg hover:bg-[var(--app-hover-crunchyroll-orange)] focus-visible:bg-[var(--app-hover-crunchyroll-orange)]"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="size-6.5 animate-spin" />
          ) : (
            "Create"
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2.5 text-right text-sm text-red-600 select-none">
          {error}
        </p>
      )}
    </form>
  );
};

export default CreateSeriesForm;
