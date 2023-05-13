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

export const openDocument = (documentId) => {
  window.open(
    `https://docs.google.com/document/d/${documentId}/edit`,
    "_blank"
  );
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
  return [...new Set(placeholders)];
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

export const formatString = (fieldName) => {
  const formattedFieldName = fieldName.replace(/_/g, ' ');
  const words = formattedFieldName.match(/[A-Za-z][a-z]*/g);

  const formattedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const formattedString = formattedWords.join(' ');
  return formattedString;
}

export const getReplaceRule = (text, replaceText) => {
  return {
      replaceAllText: {
          containsText: {
              text,
              matchCase: true,
          },
          replaceText
      },
  }
}

export const getInsertImageRule = (uri, index, height = 30) => {
  return {
      insertInlineImage: {
          uri,
          location: {
            index,
          },
          objectSize: {
              height: {
                  magnitude: height,
                  unit: "PT",
              },
          },
      }
  }  
}

export const AgreementStatus = {
  pending: 'pending',
  concluded: 'concluded',
  declined: 'declined',
  signed: 'signed',
  unsigned: 'unsigned',
}

export const getAgreementStatus = (status) => {
  if (typeof status === 'number') return Object.values(AgreementStatus)[status]
} 

export const formatDate = (date) => {
  const dateObj = new Date(date);
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getUTCFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}


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

export const contactsSocials = [
  'contacts-twitter',
  'contacts-instagram',
  'contacts-facebook',
  'contacts-phone',
  'contacts-mail',
]