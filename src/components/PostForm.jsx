import { useEffect, useMemo, useState } from "react";
import { validatePost } from "../utils/validators.js";

const defaultValues = {
  title: "",
  author: "",
  content: "",
  tags: ["react", "crud"],
};

function PostForm({ initialValues, onSubmit, submitLabel = "Save Post" }) {
  const resolvedInitial = useMemo(() => {
    if (!initialValues) return defaultValues;
    return {
      title: initialValues.title ?? "",
      author: initialValues.author ?? "",
      content: initialValues.content ?? "",
      tags: initialValues.tags && initialValues.tags.length > 0 ? initialValues.tags : ["react", "crud"],
    };
  }, [initialValues]);

  const [values, setValues] = useState(resolvedInitial);
  const [tagsInput, setTagsInput] = useState(resolvedInitial.tags.join(", "));
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const runValidation = (draftValues, draftTags) => {
    const nextErrors = validatePost({
      ...draftValues,
      tags: draftTags,
    });
    setErrors(nextErrors);
    return nextErrors;
  };

  useEffect(() => {
    setValues(resolvedInitial);
    setTagsInput(resolvedInitial.tags.join(", "));
    setErrors({});
    setHasSubmitted(false);
  }, [resolvedInitial]);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    if (field === "tags") {
      setTagsInput(value);
      if (hasSubmitted) {
        runValidation(values, value);
      }
      return;
    }

    setValues((prev) => {
      const next = { ...prev, [field]: value };
      if (hasSubmitted) {
        runValidation(next, tagsInput);
      }
      return next;
    });
  };

  const handleBlur = () => {
    if (!hasSubmitted) return;

    runValidation(values, tagsInput);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true);

    const prepared = {
      ...values,
      tags: tagsInput,
    };

    const validation = runValidation(values, tagsInput);

    if (Object.keys(validation).length > 0) {
      return;
    }

    onSubmit?.({
      title: prepared.title.trim(),
      author: prepared.author.trim(),
      content: prepared.content.trim(),
      tags: prepared.tags,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      noValidate
    >
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange("title")}
          className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          placeholder="Enter a compelling title"
          required
        />
        {errors.title ? (
          <p className="mt-1 text-xs font-medium text-rose-500">{errors.title}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-semibold text-slate-700">
          Author <span className="text-rose-500">*</span>
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={values.author}
          onChange={handleChange("author")}
          className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          placeholder="Who is writing this?"
          required
        />
        {errors.author ? (
          <p className="mt-1 text-xs font-medium text-rose-500">{errors.author}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-semibold text-slate-700">
          Content <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={values.content}
          onChange={handleChange("content")}
          className="mt-2 h-48 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          placeholder="Start typing the main content here..."
          minLength={20}
          required
        />
        {errors.content ? (
          <p className="mt-1 text-xs font-medium text-rose-500">{errors.content}</p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">Minimum 20 characters.</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-semibold text-slate-700">
          Tags <span className="text-rose-500">*</span>
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={tagsInput}
          onChange={handleChange("tags")}
          className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/40"
          placeholder="Comma separated e.g. react, crud"
        />
        {errors.tags ? (
          <p className="mt-1 text-xs font-medium text-rose-500">{errors.tags}</p>
        ) : (
          <p className="mt-1 text-xs text-slate-500">
            Separate tags with commas. Defaults to react, crud.
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="submit"
          className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default PostForm;


