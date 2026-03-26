export type BlogSection = {
  id: string;
  title: string;
  body: string[];
};

export type BlogImage = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogGraphPoint = {
  label: string;
  value: number;
};

export type BlogTable = {
  title: string;
  headers: string[];
  rows: string[][];
};

export type BlogToolCTA = {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: BlogImage;
  graph: {
    title: string;
    points: BlogGraphPoint[];
  };
  table: BlogTable;
  tool: BlogToolCTA;
  content: {
    intro: string;
    sections: BlogSection[];
  };
};

export const blogs: BlogPost[] = [
  {
    slug: "what-is-json-minification",
    title: "What Is JSON Minification?",
    description:
      "Learn how JSON minification reduces file size without changing the actual data structure.",
    date: "March 26, 2026",
    readTime: "6 min read",
    category: "JSON Guides",
    image: {
      src: "/blogs/json-minification.jpg",
      alt: "JSON minification visualization",
      caption:
        "Minification removes unnecessary whitespace while keeping the original JSON data unchanged.",
    },
    graph: {
      title: "Typical payload size after optimization",
      points: [
        { label: "Pretty JSON", value: 100 },
        { label: "Minified JSON", value: 74 },
        { label: "Compressed Transfer", value: 58 },
      ],
    },
    table: {
      title: "Formatted vs minified JSON",
      headers: ["Aspect", "Formatted JSON", "Minified JSON"],
      rows: [
        ["Readability", "High", "Low"],
        ["Payload size", "Larger", "Smaller"],
        ["Best use case", "Debugging", "Production"],
      ],
    },
    tool: {
      title: "Try Our JSON Formatter and Minifier",
      description:
        "Paste your payload into our tool to validate, beautify, minify, and inspect JSON instantly.",
      buttonText: "Open JSON Tool",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "JSON minification removes unnecessary spaces, tabs, and line breaks from a JSON document without changing any keys, values, or nesting.",
      sections: [
        {
          id: "what-it-means",
          title: "What it means",
          body: [
            "A minified JSON file contains exactly the same data as a formatted JSON file.",
            "The difference is only visual, because the human-friendly spacing is removed to make the payload more compact.",
          ],
        },
        {
          id: "why-it-matters",
          title: "Why it matters",
          body: [
            "Smaller JSON payloads can reduce network transfer size, especially when APIs return large responses repeatedly.",
            "This makes minification useful in production environments where readability is less important than efficiency.",
          ],
        },
        {
          id: "common-mistakes",
          title: "Common mistakes",
          body: [
            "The biggest mistake is manually editing JSON while trying to compress it, because one missing quote or comma can make the data invalid.",
            "A trusted formatter or minifier is safer because it preserves structure while removing only unnecessary whitespace.",
          ],
        },
      ],
    },
  },
  {
    slug: "json-formatter-vs-validator",
    title: "JSON Formatter vs JSON Validator",
    description:
      "Understand the difference between formatting JSON for readability and validating it for correctness.",
    date: "March 26, 2026",
    readTime: "5 min read",
    category: "Comparisons",
    image: {
      src: "/blogs/json-formatter-vs-validator.jpg",
      alt: "Comparison between formatter and validator",
      caption:
        "A formatter improves readability, while a validator checks whether the JSON syntax is correct.",
    },
    graph: {
      title: "Most common reasons developers use JSON tools",
      points: [
        { label: "Readability", value: 92 },
        { label: "Syntax checking", value: 87 },
        { label: "Minification", value: 61 },
      ],
    },
    table: {
      title: "Formatter vs validator",
      headers: ["Feature", "Formatter", "Validator"],
      rows: [
        ["Primary purpose", "Improve readability", "Check syntax correctness"],
        ["Fixes invalid JSON", "No", "Detects issues only"],
        ["Useful during debugging", "Yes", "Yes"],
      ],
    },
    tool: {
      title: "Use One Tool for Both Jobs",
      description:
        "Our JSON tool lets you validate first, then format or minify the same payload without switching tabs.",
      buttonText: "Try the Tool",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "JSON formatters and validators are often used together, but they solve different problems in a developer workflow.",
      sections: [
        {
          id: "formatter-role",
          title: "What a formatter does",
          body: [
            "A formatter restructures JSON with indentation, spacing, and line breaks so the hierarchy becomes easier to read.",
            "It is mainly a readability tool and is extremely useful when scanning nested objects and arrays.",
          ],
        },
        {
          id: "validator-role",
          title: "What a validator does",
          body: [
            "A validator checks whether the JSON follows proper syntax rules such as correct commas, quotes, braces, and brackets.",
            "It does not exist to make the data prettier; it exists to tell you whether the payload is valid.",
          ],
        },
        {
          id: "best-workflow",
          title: "Best workflow",
          body: [
            "In practice, developers usually validate first and format second.",
            "That order makes debugging easier because you confirm the JSON is correct before turning it into a neatly structured document.",
          ],
        },
      ],
    },
  },
  {
    slug: "how-to-fix-invalid-json",
    title: "How to Fix Invalid JSON",
    description:
      "Fix broken JSON quickly by spotting common syntax issues like commas, quotes, and brackets.",
    date: "March 26, 2026",
    readTime: "7 min read",
    category: "Debugging",
    image: {
      src: "/blogs/fix-invalid-json.jpg",
      alt: "Invalid JSON error debugging",
      caption:
        "Small syntax mistakes such as missing commas or broken quotes can invalidate an entire JSON payload.",
    },
    graph: {
      title: "Most frequent invalid JSON causes",
      points: [
        { label: "Missing commas", value: 88 },
        { label: "Broken quotes", value: 79 },
        { label: "Bracket mismatch", value: 64 },
      ],
    },
    table: {
      title: "Common invalid JSON errors",
      headers: ["Error type", "Example issue", "Result"],
      rows: [
        ["Missing comma", `"a": 1 "b": 2`, "Parser fails"],
        ["Single quotes", `{'name':'John'}`, "Invalid JSON"],
        ["Trailing comma", `{"a":1,}`, "Invalid JSON"],
      ],
    },
    tool: {
      title: "Validate Broken JSON Instantly",
      description:
        "Paste your payload into our validator to catch syntax problems before they break your app or API request.",
      buttonText: "Validate JSON",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "Invalid JSON is a common source of API failures, frontend bugs, and broken configurations, especially when payloads are edited manually.",
      sections: [
        {
          id: "start-with-the-error-line",
          title: "Start with the error line",
          body: [
            "When a validator reports a line number, always inspect that area first but also check the line just before it.",
            "In many cases, the reported line is only where the parser noticed the issue, not where the mistake actually began.",
          ],
        },
        {
          id: "most-likely-problems",
          title: "Most likely problems",
          body: [
            "Missing commas, unclosed braces, and incorrect quote usage are the most common reasons JSON becomes invalid.",
            "These mistakes are easy to miss in minified or unformatted payloads, which is why formatting often helps before debugging further.",
          ],
        },
        {
          id: "safer-workflow",
          title: "Safer workflow",
          body: [
            "Use a validator before sending payloads into production systems or third-party APIs.",
            "That simple step saves time and prevents avoidable data errors from spreading through the rest of your stack.",
          ],
        },
      ],
    },
  },
  {
    slug: "best-json-tools-for-developers",
    title: "Best JSON Tools for Developers",
    description:
      "Explore the most useful JSON tools for formatting, validation, parsing, and debugging workflows.",
    date: "March 26, 2026",
    readTime: "6 min read",
    category: "Tools",
    image: {
      src: "/blogs/best-json-tools.jpg",
      alt: "Developer tools for JSON workflows",
      caption:
        "The best JSON workflows usually combine formatting, validation, tree inspection, and conversion tools.",
    },
    graph: {
      title: "Tool categories developers use most",
      points: [
        { label: "Formatter", value: 93 },
        { label: "Validator", value: 89 },
        { label: "Tree Viewer", value: 72 },
      ],
    },
    table: {
      title: "Useful JSON tool categories",
      headers: ["Tool type", "Main job", "When to use it"],
      rows: [
        ["Formatter", "Beautify JSON", "Reading and debugging"],
        ["Validator", "Check syntax", "Before API requests"],
        ["Tree viewer", "Explore nesting", "Large payloads"],
      ],
    },
    tool: {
      title: "All-in-One JSON Workspace",
      description:
        "Use our browser-based JSON tool for validation, beautifying, minification, and structured tree inspection in one place.",
      buttonText: "Open Workspace",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "Developers work with JSON across APIs, config files, frontend state, automation scripts, and data pipelines, so the right tools can save serious time.",
      sections: [
        {
          id: "must-have-tools",
          title: "Must-have tools",
          body: [
            "A formatter, validator, and tree viewer are usually the three most useful JSON tools for everyday development.",
            "Together they cover readability, correctness, and easier navigation through deeply nested payloads.",
          ],
        },
        {
          id: "when-tools-help-most",
          title: "When tools help most",
          body: [
            "The bigger and more nested the JSON becomes, the more valuable visual tooling becomes.",
            "A good tool reduces mental load and helps you locate keys, values, and structural problems much faster.",
          ],
        },
        {
          id: "choose-for-speed",
          title: "Choose for speed",
          body: [
            "Fast rendering, helpful validation feedback, and a clean layout matter more than having dozens of rarely used options.",
            "A simple, responsive tool often improves workflow more than a bloated all-in-one editor.",
          ],
        },
      ],
    },
  },
  {
    slug: "json-beautifier-for-readability",
    title: "Why a JSON Beautifier Improves Readability",
    description:
      "See how beautifying JSON makes debugging, reviewing, and editing nested data much easier.",
    date: "March 26, 2026",
    readTime: "5 min read",
    category: "JSON Guides",
    image: {
      src: "/blogs/json-beautifier-readability.jpg",
      alt: "Beautified JSON example",
      caption:
        "Beautified JSON turns dense, unreadable data into a structured document that is easier to scan and debug.",
    },
    graph: {
      title: "Developer experience improvement after beautifying JSON",
      points: [
        { label: "Faster scanning", value: 90 },
        { label: "Fewer mistakes", value: 76 },
        { label: "Better collaboration", value: 68 },
      ],
    },
    table: {
      title: "Before vs after beautifying",
      headers: ["Aspect", "Unformatted JSON", "Beautified JSON"],
      rows: [
        ["Readability", "Low", "High"],
        ["Manual debugging", "Hard", "Much easier"],
        ["Nested structure visibility", "Poor", "Clear"],
      ],
    },
    tool: {
      title: "Beautify JSON Instantly",
      description:
        "Paste raw JSON into our tool and turn it into a readable, properly indented structure in one click.",
      buttonText: "Beautify JSON",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "Beautifying JSON is one of the simplest improvements you can make when working with API responses, configuration files, or nested frontend data.",
      sections: [
        {
          id: "see-the-structure",
          title: "See the structure",
          body: [
            "Spacing and indentation make nested objects, arrays, and key relationships much easier to understand.",
            "That helps developers quickly spot missing fields, strange values, or unexpected data shapes.",
          ],
        },
        {
          id: "better-code-reviews",
          title: "Better code reviews",
          body: [
            "Readable JSON is easier to discuss with teammates during reviews, debugging sessions, and documentation work.",
            "It reduces friction because everyone can understand the payload without mentally reconstructing the hierarchy.",
          ],
        },
        {
          id: "when-to-use-it",
          title: "When to use it",
          body: [
            "Beautifying is ideal during development, testing, support, and investigation workflows.",
            "Once the payload is ready for production transfer, minification can then be used for compact output.",
          ],
        },
      ],
    },
  },
  {
    slug: "compress-json-without-breaking-it",
    title: "How to Compress JSON Without Breaking It",
    description:
      "Reduce JSON size safely while keeping strings, values, and structure fully intact.",
    date: "March 26, 2026",
    readTime: "6 min read",
    category: "Optimization",
    image: {
      src: "/blogs/compress-json-safely.jpg",
      alt: "Safe JSON compression workflow",
      caption:
        "Safe JSON compression removes unnecessary bytes while preserving structure and valid syntax.",
    },
    graph: {
      title: "Typical JSON size savings",
      points: [
        { label: "Whitespace removal", value: 22 },
        { label: "Smarter transfer", value: 31 },
        { label: "Combined optimization", value: 42 },
      ],
    },
    table: {
      title: "Safe vs unsafe compression",
      headers: ["Method", "Safe", "Notes"],
      rows: [
        ["Using a proper minifier", "Yes", "Preserves data structure"],
        ["Manual text editing", "No", "Easy to break syntax"],
        ["Validation after output", "Yes", "Recommended step"],
      ],
    },
    tool: {
      title: "Minify JSON Safely",
      description:
        "Use our tool to minify and validate JSON in one step so you can reduce size without risking broken syntax.",
      buttonText: "Minify Safely",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "Compressing JSON safely means reducing unnecessary bytes without altering the actual content, ordering expectations, or valid syntax.",
      sections: [
        {
          id: "what-safe-means",
          title: "What safe compression means",
          body: [
            "A safe JSON minifier removes whitespace outside of strings and leaves every key, value, and bracket relationship intact.",
            "The data should remain functionally identical after minification.",
          ],
        },
        {
          id: "danger-of-manual-edits",
          title: "Danger of manual edits",
          body: [
            "Trying to manually strip whitespace or rewrite dense JSON by hand often introduces subtle errors.",
            "Even a small typo such as an accidental comma removal can invalidate the full payload.",
          ],
        },
        {
          id: "validate-after-minifying",
          title: "Validate after minifying",
          body: [
            "The safest workflow is to validate before and after minification when the data matters.",
            "That gives confidence that the optimization did not introduce hidden issues in the final output.",
          ],
        },
      ],
    },
  },
  {
    slug: "common-json-errors-explained",
    title: "Common JSON Errors Explained",
    description:
      "A simple guide to the most frequent JSON mistakes developers run into and how to avoid them.",
    date: "March 26, 2026",
    readTime: "7 min read",
    category: "Debugging",
    image: {
      src: "/blogs/common-json-errors.jpg",
      alt: "Common JSON syntax error examples",
      caption:
        "The most frequent JSON issues usually come from quote misuse, commas, and broken nesting.",
    },
    graph: {
      title: "Most common JSON syntax mistakes",
      points: [
        { label: "Missing commas", value: 84 },
        { label: "Trailing commas", value: 71 },
        { label: "Single quotes", value: 66 },
      ],
    },
    table: {
      title: "Frequent JSON issues",
      headers: ["Issue", "Why it happens", "How to avoid it"],
      rows: [
        ["Single quotes", "Copied from JS habits", "Use double quotes"],
        ["Trailing commas", "Manual editing", "Validate before saving"],
        ["Broken nesting", "Large payloads", "Format before editing"],
      ],
    },
    tool: {
      title: "Check JSON for Common Errors",
      description:
        "Run your payload through our validator to catch quote problems, commas, and structural issues instantly.",
      buttonText: "Check JSON",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "JSON is simple, but its strict syntax rules mean even tiny formatting mistakes can break parsing and cause downstream bugs.",
      sections: [
        {
          id: "quotes-commas-and-brackets",
          title: "Quotes, commas, and brackets",
          body: [
            "Most broken JSON can be traced back to one of three areas: quote usage, comma placement, or mismatched brackets.",
            "These are especially easy to miss when copying snippets between tools or editing data manually.",
          ],
        },
        {
          id: "why-errors-keep-repeating",
          title: "Why errors keep repeating",
          body: [
            "Developers often work across JavaScript objects, YAML, config files, and API payloads, so syntax rules get mixed up.",
            "That is why a dedicated validator is often safer than trusting visual inspection alone.",
          ],
        },
        {
          id: "build-a-better-routine",
          title: "Build a better routine",
          body: [
            "A consistent routine of validating, formatting, and then reviewing payloads prevents most repeat JSON mistakes.",
            "That workflow becomes even more important as payloads grow larger and more nested.",
          ],
        },
      ],
    },
  },
  {
    slug: "json-escape-characters-guide",
    title: "JSON Escape Characters Guide",
    description:
      "Learn when and why escape characters are needed inside JSON strings.",
    date: "March 26, 2026",
    readTime: "6 min read",
    category: "Reference",
    image: {
      src: "/blogs/json-escape-characters.jpg",
      alt: "Escape characters inside JSON strings",
      caption:
        "Escape characters protect quotes, backslashes, and special characters inside valid JSON strings.",
    },
    graph: {
      title: "Common escape usage in JSON strings",
      points: [
        { label: "Quotes", value: 89 },
        { label: "Backslashes", value: 74 },
        { label: "Newlines", value: 57 },
      ],
    },
    table: {
      title: "Common escape character cases",
      headers: ["Character", "Why it matters", "Needs escaping"],
      rows: [
        [`"`, "Ends a string", "Yes"],
        [`\\`, "Starts escape sequence", "Yes"],
        [`\n`, "Represents a newline", "Inside encoded strings"],
      ],
    },
    tool: {
      title: "Inspect Escaped JSON Safely",
      description:
        "Use our formatter to view complex JSON strings clearly and catch broken escape sequences before parsing fails.",
      buttonText: "Inspect JSON",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "Escape characters are essential in JSON whenever special characters appear inside string values and would otherwise break the syntax.",
      sections: [
        {
          id: "why-escaping-exists",
          title: "Why escaping exists",
          body: [
            "JSON strings are wrapped in double quotes, so any quote that appears inside the value must be escaped to avoid ending the string early.",
            "The same logic applies to backslashes and certain control characters.",
          ],
        },
        {
          id: "where-it-goes-wrong",
          title: "Where it goes wrong",
          body: [
            "Escaping errors often appear when developers manually build JSON strings inside code, logs, or templates.",
            "One missing backslash can turn valid content into invalid JSON instantly.",
          ],
        },
        {
          id: "safer-way-to-handle-it",
          title: "Safer way to handle it",
          body: [
            "Whenever possible, let a serializer or trusted library generate JSON strings instead of manually escaping everything yourself.",
            "That reduces fragile edge cases and keeps payload generation more reliable.",
          ],
        },
      ],
    },
  },
  {
    slug: "parse-json-in-javascript",
    title: "How to Parse JSON in JavaScript",
    description:
      "Understand how JSON parsing works in JavaScript and how to handle invalid payloads safely.",
    date: "March 26, 2026",
    readTime: "5 min read",
    category: "JavaScript",
    image: {
      src: "/blogs/parse-json-javascript.jpg",
      alt: "Parsing JSON in JavaScript applications",
      caption:
        "JSON parsing converts text into usable JavaScript objects, arrays, and values for application logic.",
    },
    graph: {
      title: "Typical parsing workflow steps",
      points: [
        { label: "Receive payload", value: 100 },
        { label: "Validate structure", value: 82 },
        { label: "Use parsed data", value: 76 },
      ],
    },
    table: {
      title: "Parsing workflow overview",
      headers: ["Step", "Purpose", "Risk if skipped"],
      rows: [
        ["Receive JSON text", "Get raw payload", "No data available"],
        ["Parse safely", "Convert to JS object", "Runtime failure"],
        ["Validate expected shape", "Trust structure", "Logic bugs"],
      ],
    },
    tool: {
      title: "Validate Before You Parse",
      description:
        "Check payload syntax in our JSON tool before using it in JavaScript to avoid runtime parsing errors.",
      buttonText: "Validate First",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "Parsing JSON in JavaScript turns a raw text payload into a usable object or array that your application can access directly.",
      sections: [
        {
          id: "what-parsing-does",
          title: "What parsing does",
          body: [
            "Parsing converts a JSON string into a JavaScript value that can be read, looped over, and passed through your application logic.",
            "It is one of the most common steps in API consumption and data-driven interfaces.",
          ],
        },
        {
          id: "handle-bad-input",
          title: "Handle bad input",
          body: [
            "Not every payload is trustworthy, especially in debugging, third-party APIs, or user-provided data flows.",
            "That is why validating or guarding the input before using it in application logic is such an important habit.",
          ],
        },
        {
          id: "keep-workflows-readable",
          title: "Keep workflows readable",
          body: [
            "Formatting the JSON before parsing can make debugging much easier when you are dealing with large nested objects.",
            "Readable input helps you understand both the structure and the values before your code depends on them.",
          ],
        },
      ],
    },
  },
  {
    slug: "how-json-works-in-apis",
    title: "How JSON Works in APIs",
    description:
      "Learn why JSON became the standard format for sending structured data in modern APIs.",
    date: "March 26, 2026",
    readTime: "7 min read",
    category: "APIs",
    image: {
      src: "/blogs/json-in-apis.jpg",
      alt: "JSON request and response in APIs",
      caption:
        "JSON became the standard API format because it is lightweight, structured, and easy to parse across languages.",
    },
    graph: {
      title: "Why teams prefer JSON in APIs",
      points: [
        { label: "Easy to parse", value: 94 },
        { label: "Readable", value: 81 },
        { label: "Language support", value: 88 },
      ],
    },
    table: {
      title: "Why APIs use JSON",
      headers: ["Reason", "Benefit", "Developer impact"],
      rows: [
        ["Simple structure", "Easy to model", "Faster integration"],
        ["Lightweight format", "Smaller payloads", "Better performance"],
        ["Wide support", "Works everywhere", "Less tooling friction"],
      ],
    },
    tool: {
      title: "Inspect API JSON Faster",
      description:
        "Use our tool to format, validate, and inspect API responses when debugging requests and responses.",
      buttonText: "Inspect API JSON",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "JSON became the dominant format for modern APIs because it is lightweight, predictable, and easy for both humans and machines to work with.",
      sections: [
        {
          id: "requests-and-responses",
          title: "Requests and responses",
          body: [
            "Clients often send JSON request bodies to APIs, and servers commonly return JSON responses with structured data.",
            "That shared format creates a clean contract between frontend apps, mobile apps, and backend services.",
          ],
        },
        {
          id: "why-developers-like-it",
          title: "Why developers like it",
          body: [
            "JSON is simple enough to inspect in the browser, terminal, or logs while still being structured enough for automated processing.",
            "That balance makes it practical for day-to-day development and debugging.",
          ],
        },
        {
          id: "where-tools-help",
          title: "Where tools help",
          body: [
            "API work often involves checking large responses, comparing payloads, and spotting unexpected fields or values.",
            "A formatter, validator, and tree viewer make that process much faster and less error-prone.",
          ],
        },
      ],
    },
  },
  {
    slug: "json-schema-validation-basics",
    title: "JSON Schema Validation Basics",
    description:
      "Understand how JSON Schema helps enforce structure, required fields, and data consistency.",
    date: "March 26, 2026",
    readTime: "6 min read",
    category: "Validation",
    image: {
      src: "/blogs/json-schema-validation.jpg",
      alt: "JSON schema validation concept",
      caption:
        "JSON Schema helps define expected structure so payloads can be validated beyond basic syntax rules.",
    },
    graph: {
      title: "What teams validate with JSON Schema",
      points: [
        { label: "Required fields", value: 91 },
        { label: "Data types", value: 86 },
        { label: "Nested objects", value: 73 },
      ],
    },
    table: {
      title: "Syntax validation vs schema validation",
      headers: ["Validation type", "What it checks", "Example"],
      rows: [
        ["Syntax validation", "Is the JSON valid?", "Missing comma"],
        ["Schema validation", "Is the structure correct?", "Missing required field"],
        ["Application logic", "Does the data make sense?", "Age cannot be negative"],
      ],
    },
    tool: {
      title: "Validate JSON Before Schema Checks",
      description:
        "Start by validating raw syntax in our tool so your JSON is clean before deeper schema validation begins.",
      buttonText: "Validate Raw JSON",
      buttonHref: "/#tools",
    },
    content: {
      intro:
        "Basic JSON validation tells you whether the payload is syntactically valid, but schema validation goes further and checks whether the structure matches what your application expects.",
      sections: [
        {
          id: "why-schema-matters",
          title: "Why schema matters",
          body: [
            "A payload can be valid JSON and still be completely wrong for your system if required fields are missing or values use the wrong type.",
            "Schema validation helps catch those issues before they break business logic further downstream.",
          ],
        },
        {
          id: "what-it-checks",
          title: "What it checks",
          body: [
            "JSON Schema is often used to define required properties, value types, nested object rules, and allowed formats.",
            "This adds a strong layer of consistency on top of basic syntax correctness.",
          ],
        },
        {
          id: "where-it-fits",
          title: "Where it fits",
          body: [
            "The safest order is syntax validation first, schema validation second, and business logic checks after that.",
            "That layered approach keeps your validation pipeline clearer and easier to debug.",
          ],
        },
      ],
    },
  },
];

export function getAllBlogs() {
  return blogs;
}

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}
