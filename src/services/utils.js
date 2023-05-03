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

export const parseDocument = (data) => {
  const docContent = data.body.content;
  const placeholders = [];
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
  return placeholders;
};

export const dataURIToBlob = (imageDataUrl) => {
  const byteString = atob(imageDataUrl.split(",")[1]);
  const mimeType = imageDataUrl.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return blob;
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

export const profileSocials = [
  'profile-facebook',
  'profile-twitter',
  'profile-google',
  'profile-linkedin'
]

export const formatString = (fieldName) => {
  const formattedFieldName = fieldName.replace(/_/g, ' ');
  const words = formattedFieldName.match(/[A-Za-z][a-z]*/g);

  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const formattedString = formattedWords.join(' ');
  return formattedString;
}