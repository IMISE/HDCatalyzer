/*Copyright (C) 2024 European Union

 __

Licensed under the EUPL, Version 1.2 or – as soon they will be approved by the

European Commission – subsequent versions of the EUPL (the “Licence”);

You may not use this work except in compliance with the Licence.

You may obtain a copy of the Licence at:

*

https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12

*

Unless required by applicable law or agreed to in writing, software distributed under

the Licence is distributed on an “AS IS” basis, WITHOUT WARRANTIES OR CONDITIONS

OF ANY KIND, either express or implied. See the Licence for the specific language

governing permissions and limitations under the Licence.*/
export default class UtilService {
    constructor(baseUrl, apiUrl) {
    this.baseUrl = baseUrl;
    this.apiUrl = apiUrl;
  }

  /**
   * Creates an item
   * @param data
   * @returns {Promise<unknown>}
   */
  create(data) {
    const endpoint = `${this.baseUrl}/${this.apiUrl}`;
    return axios.post(endpoint, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
  }

  /**
   * Updates an item
   * @param data
   * @returns {Promise<unknown>}
   */
  put(data) {
    const endpoint = `${this.baseUrl}/${this.apiUrl}`;
    return axios.put(endpoint, data)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
  }

  /**
   * Retrieve a paginated list of items
   * @param page
   * @param limit
   * @returns {Promise<T>}
   */
  getItemsPaginated(page, limit) {
    const endpoint = `${this.baseUrl}/${this.apiUrl}?page=${page}&limit=${limit}`;
    return axios.get(endpoint)
    .then(response => {
      const metadata = response.data.metadata;
      const items = response.data.data;
      return { metadata, items };
    })
    .catch(error => {
      throw error;
    });
  }

  getItemsPaginatedFilterByObject(page, limit, field, valueField, criteriaObject) {
    let constructUrl = `${this.baseUrl}/${this.apiUrl}`;

    if (page) {
      constructUrl += `?page=${page}`;
    }

    if (limit) {
      if (page) {
        constructUrl += `&limit=${limit}`;
      } else {
        constructUrl += `?limit=${limit}`;
      }
    }

    if (field && valueField) {
      if (page || limit) {
        constructUrl += `&sortBy=${field}&sortOrder=${valueField}`;
      } else {
        constructUrl += `?sortBy=${field}&sortOrder=${valueField}`;
      }
    }

    const endpoint = constructUrl;
    return axios.post(endpoint, criteriaObject)
      .then(response => {
        const metadata = response.data.metadata;
        const items = response.data.data;
        return { metadata, items };
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Retrieve all items without pagination
   * @returns {Promise<T>}
   */
  getAll() {
    const endpoint = `${this.baseUrl}/${this.apiUrl}`;
    return axios.get(endpoint)
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      throw error;
    });
  }

  getApplicationByStatus(dataObject) {
    return this.getItemsPaginatedFilterByObject(null,null,null,null,dataObject);
  }

  /**
   * Get an item based on an ID
   * @param id
   * @returns {Promise<T>}
   */
  getById(id) {
    const endpoint = `${this.baseUrl}/${this.apiUrl}/${id}`;
    return fetch(endpoint)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
  }

  /**
   * Delete an item based on an ID
   * @param itemId
   * @returns {Promise<T>}
   */
  delete(itemId) {
    const endpoint = `${this.baseUrl}/${this.apiUrl}/${itemId}`;
    return axios.delete(endpoint)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
  }

  /**
   * Delete all items from the database
   * @returns {Promise<T>}
   */
  deleteAll() {
    const endpoint = `${this.baseUrl}/${this.apiUrl}/`;
    return axios.delete(endpoint)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
  }
}
