import axios from "axios";

class API {

    axios;

    constructor() {

        this.axios = axios.create();

    }

    /**
     * @param {String} name 
     * @param {String} value 
     */
    setHeader( name, value ) {

        if( value )

            this.axios.defaults.headers.common[name] = value;

        else

            delete this.axios.defaults.headers.common[name];

    }

    /**
     * @param {object} userData 
     * @param {String} userData.email
     * @param {String} userData.password
     * 
     * @returns {Promise}
     */
    register( userData ) {
        console.log(userData)
        //if(userData.role === "personal"){
            return this.axios.post("/api/authenticate/register/personal", userData);
//}
        //return this.axios.post("/api/authenticate/register/organization", userData);
    }


    /**
     * @param {object} userData 
     * @param {String} userData.email
     * @param {String} userData.password
     * 
     * @returns {Promise}
     */
    login( userData ) {


        return this.axios.post("/api/authenticate/login", userData);

    }

    authenticated() {

        return this.axios.post("/api/authenticated");

    }

}

export default new API();