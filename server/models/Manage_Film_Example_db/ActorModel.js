import ActorModelGenerated from "./generated/ActorModelGenerated";

const customModel = {
  
  /**
   * Customize here your schema with custom attributes
   * 
   * EXAMPLE:
    
    init() {
      let schema = ActorModelGenerated.init();
  
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
      return await ActorModelGenerated.getModel().findOne({ _id: id });
    }

   */

};

export default {
  ...ActorModelGenerated,
  ...customModel
};
