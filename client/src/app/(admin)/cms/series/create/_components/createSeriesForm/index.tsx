"use client";

import { useState, MouseEvent, FormEvent, ChangeEvent, JSX } from "react";

import { getAttribute } from "@/lib/utils";

import { FaPlus, FaMinus } from "react-icons/fa";

import "./index.css";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_SIZE = 6 * 1024 * 1024;

const ImageInput: React.FC<{
  label: string;
  name: string;
  required?: boolean;
  className?: string;
}> = ({ label, name, required = true, className }) => {
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

const DetailInput: React.FC<{ id: number; button: JSX.Element }> = ({
  id,
  button,
}) => {
  return (
    <div
      key={id}
      className="relative mb-2.5 grid grid-cols-1 gap-4 rounded-md border border-gray-300 px-4 py-2 md:grid-cols-2"
    >
      <div>
        <label htmlFor={`details-key-${id}`} className="input-label">
          Key
        </label>
        <input
          id={`details-key-${id}`}
          name={`details-key-${id}`}
          type="text"
          required
          className="input"
        />
      </div>

      <div>
        <label htmlFor={`details-value-${id}`} className="input-label">
          Value
        </label>
        <input
          id={`details-value-${id}`}
          name={`details-value-${id}`}
          type="text"
          required
          className="input"
        />
      </div>

      {button}
    </div>
  );
};

const CreateSeriesForm: React.FC = () => {
  const [detailIds, setDetailIds] = useState<number[]>([]);

  function addDetailInput() {
    setDetailIds((prev) => [...prev, Date.now()]);
  }

  function removeDetailInput(e: MouseEvent) {
    const dataId = parseInt(getAttribute(e, "button", "data-id"));

    setDetailIds((prev) => prev.filter((index) => index !== dataId));
  }

  function createSeries(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <form
      onSubmit={createSeries}
      className="mx-auto w-full max-w-3xl rounded-md bg-[var(--app-overlay-secondary)] p-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ImageInput name="banner.name" label="Banner Name" required />
        <ImageInput name="banner.tall" label="Banner Tall" />
        <ImageInput name="banner.wide" label="Banner Wide" />
        <ImageInput name="poster.tall" label="Poster Tall" />
        <ImageInput
          name="poster.wide"
          label="Poster Wide"
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
          >
            <option value="tag1">Tag 1</option>
            <option value="tag2">Tag 2</option>
            <option value="tag3">Tag 3</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="input text-area"
            rows={7}
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
          >
            <option value="genre1">Genre 1</option>
            <option value="genre2">Genre 2</option>
            <option value="genre3">Genre 3</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <span className="input-label">Details</span>
          <DetailInput
            id={0}
            button={
              <button
                type="button"
                onClick={addDetailInput}
                className="absolute top-1.5 right-1.5 text-indigo-600"
              >
                <FaPlus className="size-4.5" />
              </button>
            }
          />

          {detailIds.map((id) => (
            <DetailInput
              key={id}
              id={id}
              button={
                <button
                  type="button"
                  data-id={id}
                  onClick={removeDetailInput}
                  className="absolute top-1.5 right-1.5 text-red-600"
                >
                  <FaMinus className="size-4.5" />
                </button>
              }
            />
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
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="app-transition-colors rounded-md bg-[var(--app-background-crunchyroll-orange)] px-6 py-2 text-lg hover:bg-[var(--app-hover-crunchyroll-orange)] focus-visible:bg-[var(--app-hover-crunchyroll-orange)]"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateSeriesForm;
