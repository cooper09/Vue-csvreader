var makeaDecision = {
  //cooper s - within7dys is the "Boucher" check
  doYourThing(conversion, trainingData ) {
  console.log("makeaDecision = Run a decision tree: ", conversion);
  console.log("makeaDecision - test data passed: ", trainingData );

  //cooper s - convert training data, alligatah!

const testData = trainingData.map(([ad_id, xyz_campaign_id, fb_campaign_id, age, gender, interest, Impressions, Clicks, Spent, Total_Conversions, Approved_Conversion ]) => ({ad_id, xyz_campaign_id, fb_campaign_id, age, gender, interest, Impressions, Clicks, Spent, Total_Conversions, Approved_Conversion }));
console.log("makeaDecsion - converted training data: ", testData);

      //cooper s - loop through our conversions to see if we can find a matching date
      
      var finalArr = [];

        var config = {
          trainingSet: testData, 
          categoryAttr: 'Approved_Conversion'
        };

    // Building Decision Tree
    var decisionTree = new dt.DecisionTree(config);
    //console.log("decisionTree-category: ", decisionTree  );
      
    // Building Random Forest
    var numberOfTrees = 3;
    var randomForest = new dt.RandomForest(config, numberOfTrees);

    var decisionTreePrediction = decisionTree.predict(conversion);
    console.log("decisionTreePrediction: ",  decisionTreePrediction );

    var randomForestPrediction = randomForest.predict(conversion);
    
    console.log("randomForestPrediction: " , randomForestPrediction );
  
        
        finalArr=["a","b","c"]
    
        //console.log("Load Data: ", decisionTreePrediction );
        return finalArr; 

  //

    }//end doyourthing
}//end makeadecision

export default makeaDecision