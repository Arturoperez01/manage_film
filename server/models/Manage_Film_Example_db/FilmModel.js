import FilmModelGenerated from "./generated/FilmModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
    
    init() {
      let schema = FilmModelGenerated.init();
  
      schema.add({
        extraCustomField: Object
      });
    },
     
   */


  /**
   * Override here your custom queries
   * EXAMPLE:
   *
   
    async get(id) {
      console.log("This is my custom query");
      return await FilmModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...FilmModelGenerated,
  ...customModel
};
