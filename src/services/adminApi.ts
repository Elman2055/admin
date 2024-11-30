class AdminApi {
  static API_BASE_URL = "https://batyssp.kz/api/v1";
  static getToken = () => localStorage.getItem("admin_token");

  static onLoginAdmin = async (auth: {}) => {
    try {
      const url = `${AdminApi.API_BASE_URL}/admin/auth`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });

      const data = await response.json();
      if (data.success) localStorage.setItem("admin_token", data.auth_token);

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static getCategories = async (link: string, type: string) => {
    try {
      const url = `${AdminApi.API_BASE_URL}/${link}/${type}`;
      console.log("url: ", url);
      const response = await fetch(url, {
        method: 'GET'
      });

      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log('get categories: ', error);
    }
  };

  static getProducts = async (link: string, page: number) => {
    try {
      const url = `${AdminApi.API_BASE_URL}/${link}/list/${page}`;
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static addCategory = async (link: string, category: object) => {
    try {
      const url = `${AdminApi.API_BASE_URL}/${link}/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        console.error(`Failed to add category: ${response.statusText}`);
        return undefined; // Явно возвращаем undefined в случае ошибки
      }

      const responseJson = await response.json();
      return responseJson; // Возвращаем корректный ответ
    } catch (error) {
      console.error('Error in addCategory:', error);
      return undefined; // Обрабатываем ошибку и возвращаем undefined
    }
  };


  static onAddProducts = async (link: string, product: FormData) => {
    try {
      const url = `${AdminApi.API_BASE_URL}/${link}/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AdminApi.getToken()}`,
        },
        body: product,
      });
      const data = await response.json();

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  static onDelete = async (link: string, id: number) => {
    const url = `${AdminApi.API_BASE_URL}/${link}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${AdminApi.getToken()}`,
      },
    });
    const data = await response.json();

    return data;
  };

  static getProduct = async (link: string, id: number) => {
    const url = `${AdminApi.API_BASE_URL}/${link}/${id}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AdminApi.getToken()}`,
      },
    });
    const data = await response.json();

    return data;
  };

  static onEdit = async (link: string, id: number, product: FormData) => {
    const url = `${AdminApi.API_BASE_URL}/${link}/${id}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AdminApi.getToken()}`,
      },
      body: product,
    });
    const data = await response.json();

    return data;
  };
}

export default AdminApi;
