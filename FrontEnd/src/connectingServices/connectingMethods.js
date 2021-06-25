var ROOT = "https://localhost:44331";

const standartHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + sessionStorage.tokenKey,
  "Access-Control-Allow-Origin": "*"
};

export const requests = {
  doPost: async function (path, data) {
    const response = await fetch(ROOT + path, {
      method: "POST",
      mode: "cors",
      headers:
        data.values === undefined
          ? standartHeaders
          : {
            Accept: "application/json",
            Authorization: " " + sessionStorage.tokenKey
          },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  doGet: async function (path) {
    const response = await fetch(ROOT + path, {
      method: "GET",
      mode: "cors",
      headers: standartHeaders
    }).then(resp => resp.json());
    return response;
  },

  doPut: async function (path, body) {
    const response = await fetch(ROOT + path, {
      method: "PUT",
      mode: "cors",
      headers:
        body.values === undefined
          ? standartHeaders
          : {
            Accept: "application/json",
            Authorization: " " + sessionStorage.tokenKey
          },
      body: JSON.stringify(body)
    });
    return response.json();
  },

  doDelete: async function (path) {
    const response = await fetch(ROOT + path, {
      method: "DELETE",
      mode: "cors",
      headers: standartHeaders
    });
    return response.json();
  }
};