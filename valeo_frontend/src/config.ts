const API_URL = import.meta.env.VITE_API_URL;

export const API = {
  rappView: {
    getAllBuckets: `${API_URL}cloud-storage/bucket`,
    getBucketNames: `${API_URL}cloud-storage/bucket?bucketName=`,
    postDescription: `${API_URL}cloud-storage/bucketFile/`,
    getAllRapps: `${API_URL}cloud-storage/bucketFile/`,
  },
  rappbuild: {
    inputOutput: `${API_URL}data-warehousing/data/input/testDataset?tableName=testTable`,
    build: `${API_URL}cloud-storage/bucketFile/`,
    update: `${API_URL}cloud-storage/bucketFile/`,
    getDescripion: `${API_URL}cloud-storage/bucketFile/`,
    getConfiguration: `${API_URL}cloud-storage/bucketFile/`,
    models: `${API_URL}bigquery-ai/model/type`,
  },
};
