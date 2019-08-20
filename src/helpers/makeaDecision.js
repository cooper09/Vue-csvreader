var makeaDecision = {
  //cooper s - within7dys is the "Boucher" check
  doYourThing(conversion, trainingData ) {
  alert("Run a decision tree: " + conversion[0].columnA);
  console.log("makeaDecision - test data passed: ", trainingData );
      //cooper s - loop through our conversions to see if we can find a matching date
      
      var finalArr = [];

        var config = {
          trainingSet: trainingData, 
          categoryAttr: 'columnC'
        };

    // Building Decision Tree
    var decisionTree = new dt.DecisionTree(config);
    console.log("decisionTree-category: ", decisionTree.category  );
      
    // Building Random Forest
    var numberOfTrees = 3;
    var randomForest = new dt.RandomForest(config, numberOfTrees);

    var decisionTreePrediction = decisionTree.predict(conversion[0]);
    console.log("decisionTreePrediction: ",  decisionTreePrediction );

    var randomForestPrediction = randomForest.predict(conversion[0]);
    
    console.log("randomForestPrediction: " , randomForestPrediction );
  
        
        finalArr=["a","b","c"]
    
        console.log("Load Data: ", decisionTreePrediction );
        return finalArr; 

  //

    }//end doyourthing
}//end makeadecision

export default makeaDecision