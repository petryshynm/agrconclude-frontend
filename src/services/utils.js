import { docsInterceptor } from "./axiosInterceptor/docsInterceptor";

export const getProfile = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const getDocumentFields = () => {
  docsInterceptor
    .get(
      "https://docs.googleapis.com/v1/documents/1_DgRZgP102TFC5J-EV1Upyx-fK9MJag3FsgZHHk51A4"
    )
    .then(
      (response) => {
        console.log(response);
        const docContent = response.data.body.content;
        const placeholders = [];
        // Search of all templates in document
        docContent.forEach((element) => {
          if (element.paragraph && element.paragraph.elements) {
            element.paragraph.elements.forEach((ele) => {
              if (ele.textRun && ele.textRun.content.includes("{{")) {
                const content = ele.textRun.content;
                const regex = /{{(.*?)}}/g;
                let match;
                while ((match = regex.exec(content)) !== null) {
                  placeholders.push(match[1]);
                }
              }
            });
          }
        });
        console.log(placeholders); // logging of all templates into the console
      },
      (error) => {
        console.error(error);
      }
    );
};


export const socials = [
  {},
  {},
  {
    icon: 'twitter',
    color: 'astral',
  },
  {},
  {
    icon: 'facebook',
    color: 'carolina',
  },
  {
    icon: 'instagram',
    color: 'steel',
  },
  {
    icon: 'phone',
    color: 'lapis',
  },
  {},
  {
    icon: 'mail',
    color: 'lapis',
  },
];
