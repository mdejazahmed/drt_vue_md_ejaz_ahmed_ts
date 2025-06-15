// Utilities
import { defineStore } from 'pinia'
import { satelliteAPI } from '@/services/api.ts';
export const useAppStore = defineStore('app', {
  state: () => ({
    satellites: [],
    selectedItems:[],
    loading:false,
    search:"",
    headers:[
      { title: "Name", key: "name", sortable: true },
      { title: "NORAD Cat ID", key: "noradCatId", sortable: true },
      { title: "Orbit Code", key: "orbitCode", sortable: true },
      { title: "Object Type", key: "objectType", sortable: false },
      { title: "Country Code", key: "countryCode", sortable: true },
      { title: "Launch Date", key: "launchDate", sortable: false },
    ],
    selectedObjectTypes:["ROCKET BODY,PAYLOAD,UNKNOWN,DEBRIS"],
    selectedAttributes:["noradCatId", "intlDes", "name"],
  }),
  actions:{
    async getSatellites(){
      this.loading = true;
      try {
        const response = await satelliteAPI.getSatellites({
          objectTypes: this.selectedObjectTypes,
          attributes: this.selectedAttributes,
        });
        this.satellites = response.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  }
},

)
export const useSnackbarStore = defineStore("snackbarStore", {
  state: () => ({
    show: false,
    color:"success",
    msg:"Operation Successful"
  }),
  actions:{
    showSnackbar({color="success",msg="Operation Successful"}){
     this.show=true
     this.color=color;
     this.msg=msg;
    },
  }
});
