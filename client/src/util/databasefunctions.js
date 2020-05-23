import axios from 'axios'

const dbFuncs = {
  putOrderToDB: (message) => {
      axios.post('http://localhost:3001/api/putOrder', {
          id: 1,
          message: message,
      });
  },
  
  getDataFromDb: () => {
      fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
  },
  
  deleteFromDB: (idTodelete) => {
      parseInt(idTodelete);
      let objIdToDelete = null;
      this.state.data.forEach((dat) => {
        if (dat.id == idTodelete) {
          objIdToDelete = dat._id;
        }
      });
  
      axios.delete('http://localhost:3001/api/deleteData', {
        data: {
          id: objIdToDelete,
        },
      });
  },
  
  updateDB: (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      parseInt(idToUpdate);
      this.state.data.forEach((dat) => {
        if (dat.id == idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });
  
      axios.post('http://localhost:3001/api/updateData', {
        id: objIdToUpdate,
        update: { message: updateToApply },
      });
  }
}


export default {dbFuncs}