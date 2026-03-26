export type BlogSection =
  | {
      type: "paragraph";
      heading?: string;
      level?: 2 | 3 | 4 | 5;
      content: string;
      id?: string;
    }
  | {
      type: "list";
      heading?: string;
      level?: 2 | 3 | 4 | 5;
      items: string[];
      ordered?: boolean;
      id?: string;
    }
  | {
      type: "table";
      heading?: string;
      level?: 2 | 3 | 4 | 5;
      id?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "graph";
      heading?: string;
      level?: 2 | 3 | 4 | 5;
      id?: string;
      bars: {
        label: string;
        value: string;
        height: number;
        color?: string;
      }[];
      note?: string;
    }
  | {
      type: "code";
      heading?: string;
      level?: 2 | 3 | 4 | 5;
      id?: string;
      code: string;
    }
  | {
      type: "faq";
      heading?: string;
      level?: 2 | 3 | 4 | 5;
      id?: string;
      items: {
        question: string;
        answer: string;
      }[];
    };

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  coverTitle?: string;
  sections: BlogSection[];
  keywords?: string[];
};
