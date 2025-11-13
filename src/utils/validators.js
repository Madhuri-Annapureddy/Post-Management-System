const minimumContentLength = 20;

const splitTags = (value) =>
  Array.isArray(value)
    ? value
    : String(value ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

export function validatePost(values) {
  const errors = {};

  if (!values.title || values.title.trim().length === 0) {
    errors.title = "Title is required.";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title should be at least 3 characters.";
  }

  if (!values.author || values.author.trim().length === 0) {
    errors.author = "Author name is required.";
  } else if (values.author.trim().length < 2) {
    errors.author = "Author name should be at least 2 characters.";
  }

  if (!values.content || values.content.trim().length === 0) {
    errors.content = "Content is required.";
  } else if (values.content.trim().length < minimumContentLength) {
    errors.content = `Content must be at least ${minimumContentLength} characters.`;
  }

  const tags = splitTags(values.tags);
  if (tags.length === 0) {
    errors.tags = "Provide at least one tag.";
  }

  return errors;
}

export function normalizeTags(value) {
  const tags = splitTags(value);
  return tags.length > 0 ? tags : ["react", "crud"];
}


