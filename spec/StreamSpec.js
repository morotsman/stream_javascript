describe("An immutable lazy Stream", function() {
  var emptyStream;

  beforeEach(function() {
    emptyStream = new Stream();
  });
  
  it("that is empty should throw an exception if head is invoked.", function() {
    expect(emptyStream.head).toThrow();
  });  
  
  it("that is empty should throw an exception if tail is invoked.", function() {
    expect(emptyStream.tail).toThrow();
  });  

  it("is not modified if a new item is added.", function() {
    var streamOfOne = emptyStream.cons("one");
    expect(emptyStream.head).toThrow();
  });
  
  it("should create a new stream if an item is added.", function() {
    var streamOfOne = emptyStream.cons("one");
    expect(streamOfOne.head()).toEqual("one");
  });  
  
  it("should be able to be initalized with an item at creation.", function() {
    var streamOfOne = new Stream("one");
    expect(streamOfOne.head()).toEqual("one");
  });  
  
  it("should be able to be initalized sveral items at creation.", function() {
    var streamOfThree = new Stream("one", "two", "three");
    expect(streamOfThree.head()).toEqual("one");
    expect(streamOfThree.tail().head()).toEqual("two");
    expect(streamOfThree.tail().tail().head()).toEqual("three");
    expect(streamOfThree.tail().tail().tail().head).toThrow();
  });  
  
  it("should be able to create two different streams.", function() {
    var streamOfTwoStrings = new Stream("one", "two");
    var streamOfTwoNumbers = new Stream(1, 2);
    expect(streamOfTwoStrings.head()).toEqual("one");
    expect(streamOfTwoStrings.tail().head()).toEqual("two");
    expect(streamOfTwoNumbers.head()).toEqual(1);
    expect(streamOfTwoNumbers.tail().head()).toEqual(2);    
  });
  
  it("should be able to be converted to an array if empty.", function() {
    var emptyStream = new Stream();
    expect(emptyStream.toArray()).toEqual([]);  
  }); 
  
  it("should be able to be converted to an array if containing one element.", function() {
    var stream = new Stream("one");
    expect(stream.toArray()).toEqual(["one"]);  
  });  
  
  it("should be able to be converted to an array if containing several elements.", function() {
    var stream = new Stream("one", "two", "three");
    expect(stream.toArray()).toEqual(["one", "two", "three"]);  
  }); 
  
  it("Stream().map(v*2) should result in Stream() and leave the original stream unaffected.", function() {
    var originalStream = new Stream();
    expect(originalStream.toArray()).toEqual([]); 
    var updatedStream = originalStream.map(function(v){ return v*2;});
    expect(originalStream.toArray()).toEqual([]);
    expect(updatedStream.toArray()).toEqual([]);
  });  
  
  it("Stream(1).map(v*2) should result in Stream() and leave the original stream unaffected.", function() {
    var originalStream = new Stream(1);
    expect(originalStream.toArray()).toEqual([1]); 
    var updatedStream = originalStream.map(function(v){ return v*2;});
    expect(originalStream.toArray()).toEqual([1]);
    expect(updatedStream.toArray()).toEqual([2]);
  });     
  
  it("Stream(1,2,3).map(v => v*2) should result in Stream(2,4,6) and leave the original stream unaffected.", function() {
    var originalStream = new Stream(1, 2, 3);
    expect(originalStream.toArray()).toEqual([1, 2, 3]); 
    var updatedStream = originalStream.map(function(v){ return v*2;});
    expect(originalStream.toArray()).toEqual([1, 2, 3]);
    expect(updatedStream.toArray()).toEqual([2, 4, 6]);
  });  
  
  it("Stream().take(0) should result in Stream() and leave the original stream unaffected.", function() {
    var originalStream = new Stream();
    expect(originalStream.toArray()).toEqual([]); 
    var updatedStream = originalStream.take(0);
    expect(originalStream.toArray()).toEqual([]);
    expect(updatedStream.toArray()).toEqual([]);
  });  
  
  it("Stream().take(1) should result in Stream() and leave the original stream unaffected.", function() {
    var originalStream = new Stream();
    expect(originalStream.toArray()).toEqual([]); 
    var updatedStream = originalStream.take(1);
    expect(originalStream.toArray()).toEqual([]);
    expect(updatedStream.toArray()).toEqual([]);
  });    
  
  it("Stream(1,2,3).take(0) should result in Stream() and leave the original stream unaffected.", function() {
    var originalStream = new Stream(1, 2, 3);
    expect(originalStream.toArray()).toEqual([1, 2, 3]); 
    var updatedStream = originalStream.take(0);
    expect(originalStream.toArray()).toEqual([1, 2, 3]);
    expect(updatedStream.toArray()).toEqual([]);
  });
  
  it("Stream(1,2,3).take(1) should result in Stream(1) and leave the original stream unaffected.", function() {
    var originalStream = new Stream(1, 2, 3);
    expect(originalStream.toArray()).toEqual([1, 2, 3]); 
    var updatedStream = originalStream.take(1);
    expect(originalStream.toArray()).toEqual([1, 2, 3]);
    expect(updatedStream.toArray()).toEqual([1]);
  }); 
  
  it("Stream(1,2,3).take(3) should result in Stream(1,2,3) and leave the original stream unaffected.", function() {
    var originalStream = new Stream(1, 2, 3);
    expect(originalStream.toArray()).toEqual([1, 2, 3]); 
    var updatedStream = originalStream.take(3);
    expect(originalStream.toArray()).toEqual([1, 2, 3]);
    expect(updatedStream.toArray()).toEqual([1,2,3]);
  });  
  
  it("Stream(1,2,3).take(4) should result in Stream(1,2,3) and leave the original stream unaffected.", function() {
    var originalStream = new Stream(1, 2, 3);
    expect(originalStream.toArray()).toEqual([1, 2, 3]); 
    var updatedStream = originalStream.take(4);
    expect(originalStream.toArray()).toEqual([1, 2, 3]);
    expect(updatedStream.toArray()).toEqual([1,2,3]);
  });
  
  it("Stream().generate(1, v => v).toArray should result in stack overflow.", function() {
    var infinitStreamOfOne = new Stream().generate(1, function(seed){ return seed;});
    expect(infinitStreamOfOne.toArray).toThrow(); 

  });   
  
  it("Stream().generate(1, v => v).take(4) should result in Stream(1,1,1,1).", function() {
    var infinitStreamOfOne = new Stream().generate(1, function(seed){ return seed;});
    expect(infinitStreamOfOne.take(4).toArray()).toEqual([1, 1, 1, 1]); 
  });   
  
  it("Stream().generate(1, v => v + 1).take(4) should result in Stream(1,2,3,4).", function() {
    var infinitStreamOfPositiveNumbers = new Stream().generate(1, function(seed){ return seed + 1;});
    expect(infinitStreamOfPositiveNumbers.take(4).toArray()).toEqual([1, 2, 3, 4]); 
  }); 
  
  it("Stream().generate(1, v => v + 1).takeWhile(v => v < 10) should result in Stream(1,2,3,4,5,6,7,8,9).", function() {
    var infinitStreamOfPositiveNumbers = new Stream().generate(1, function(seed){ return seed + 1;});
    expect(infinitStreamOfPositiveNumbers.takeWhile(function(v){ return v < 10;}).toArray()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]); 
  });
  
  it("Stream().generate(1, v => v + 1).takeWhile(v => v < 1) should result in Stream().", function() {
    var infinitStreamOfPositiveNumbers = new Stream().generate(1, function(seed){ return seed + 1;});
    expect(infinitStreamOfPositiveNumbers.takeWhile(function(v){ return v < 1;}).toArray()).toEqual([]); 
  }); 
  
  it("Stream().generate(1, v => v + 1).takeWhile(v => v > 0) should result in stack overflow.", function() {
    var infinitStreamOfPositiveNumbers = new Stream().generate(1, function(seed){ return seed + 1;});
    expect(infinitStreamOfPositiveNumbers.takeWhile(function(v){ return v > 0;}).toArray).toThrow(); 
  });  
  
  it("Stream().takeWhile(v => v < 0) should result in Stream().", function() {
    var emptyStream = new Stream();
    expect(emptyStream.takeWhile(function(v){ return v > 0;}).toArray()).toEqual([]); 
  });  
  
  it("Stream().generate(1, v => v + 1).filter(v => v%2) should result in a stream of positive even numbers.", function() {
    var allPositiveNumbers = new Stream().generate(1, function(seed){ return seed + 1;});
    var allEvenPositiveNumbers = allPositiveNumbers.filter(function(v){ return v%2 === 0});
    expect(allEvenPositiveNumbers.take(5).toArray()).toEqual([2,4,6,8,10]); 
  });  
  
  it("Stream().filter(v => v%2) should result in an empty stream.", function() {
    var emptyStreaam = new Stream();
    var anotherEmptyStream = emptyStreaam.filter(function(v){ return v%2 === 0});
    expect(anotherEmptyStream.toArray()).toEqual([]); 
  });  
  
  it("Stream().generate(1, v => v + 1).take(5).foldLeft(0, (acc,v) => acc + v) should result in a sum of the first five positive numbers (15).", function() {
    var allPositiveNumbers = new Stream().generate(1, function(seed){ return seed + 1;});
    expect(allPositiveNumbers.take(5).foldLeft(0, function(acc,v){ return acc + v;})).toEqual(15); 
  });  
  
  it("Stream().foldLeft(0, (acc,v) => acc + v) should result in 0.", function() {
    var emptyStream = new Stream();
    expect(emptyStream.foldLeft(0, function(acc,v){ return acc + v;})).toEqual(0); 
  });   
  
  it("Stream().generate(1, v => v + 1).take(5).foldRight(0, (acc,v) => acc + v) should result in a sum of the first five positive numbers (15).", function() {
    var allPositiveNumbers = new Stream().generate(1, function(seed){ return seed + 1;});
    expect(allPositiveNumbers.take(5).foldRight(0, function(acc,v){ return acc + v;})).toEqual(15); 
  });  
  
  it("Stream().foldRight(0, (acc,v) => acc + v) should result in 0.", function() {
    var emptyStream = new Stream();
    expect(emptyStream.foldRight(0, function(acc,v){ return acc + v;})).toEqual(0); 
  });
  
  it("Stream().zip(Stream(1,2,3)) should result in Stream().", function() {
    var emptyStream = new Stream();
    var streamOfThree = new Stream(1,2,3)
    var zippedStream = emptyStream.zip(streamOfThree);
    expect(zippedStream.toArray()).toEqual([]); 
  });
  
  it("Stream(1,2,3).zip(Stream()) should result in Stream().", function() {
    var emptyStream = new Stream();
    var streamOfThree = new Stream(1,2,3)
    var zippedStream = streamOfThree.zip(emptyStream)
    expect(zippedStream.toArray()).toEqual([]); 
  });   
  
  it("Stream(1,2,3).zip(Stream(\"one\",\"two\",\"three\")) should result in Stream({ one: 1, two: \"one\" },{ one: 2, two: \"two\" },{ one: 3, two: \"three\" }).", function() {
    var streamOfThree = new Stream(1,2,3);
    var zippedStream = streamOfThree.zip(new Stream("one","two","three"));
    expect(zippedStream.toArray()).toEqual([{ one: 1, two: "one" },{ one: 2, two: "two" },{ one: 3, two: "three" }]); 
  });  
  
  it("Stream(1,2,3).zip(Stream(\"one\",\"two\")) should result in Stream({ one: 1, two: \"one\" },{ one: 2, two: \"two\" }).", function() {
    var streamOfThree = new Stream(1,2,3);
    var streamOfTwo = new Stream("one","two");
    var zippedStream = streamOfThree.zip(streamOfTwo);
    expect(zippedStream.toArray()).toEqual([{ one: 1, two: "one" },{ one: 2, two: "two" }]); 
  });  
  
  it("Stream(1,2).zip(Stream(\"one\",\"two\",\"three\")) should result in Stream({ one: 1, two: \"one\" },{ one: 2, two: \"two\" }).", function() {
    var streamOfThree = new Stream(1,2);
    var streamOfTwo = new Stream("one","two", "three");
    var zippedStream = streamOfThree.zip(streamOfTwo);
    expect(zippedStream.toArray()).toEqual([{ one: 1, two: "one" },{ one: 2, two: "two" }]); 
  }); 
  
  it("Stream(of fibs).take(10) should result in [0, 1, 1, 2, 3, 5, 8, 13, 21, 34].", function() {
    var streamOfFibs = new Stream()
            .generate({one: 0 , two: 1}, function(seed){ return {one: seed.two, two:(seed.one + seed.two)}})
            .map(function(v){ return v.one;});
    expect(streamOfFibs.take(10).toArray()).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]); 
  }); 
  
  
  it("Stream().append(Stream() should result in Stream()).", function() {
    var emptyStream= new Stream();
    expect(emptyStream.append(emptyStream).toArray()).toEqual([]); 
  });   
  
  it("Stream().append(Stream(1,2) should result in Stream(1,2)).", function() {
    var emptyStream= new Stream();
    var streamOfTwo = new Stream(1,2)
    expect(emptyStream.append(streamOfTwo).toArray()).toEqual([1,2]); 
  });
  
  it("Stream(1,2).append(Stream() should result in Stream(1,2)).", function() {
    var emptyStream= new Stream();
    var streamOfTwo = new Stream(1,2)
    expect(streamOfTwo.append(emptyStream).toArray()).toEqual([1,2]); 
  });  
  
  it("Stream(1,2).append(Stream(3,4) should result in Stream(1,2,3,4)).", function() {
    var streamOfThreeAndFour= new Stream(3,4);
    var streamOfOneAndTwo = new Stream(1,2)
    expect(streamOfOneAndTwo.append(streamOfThreeAndFour).toArray()).toEqual([1,2,3,4]); 
  });  
  
  
  it("Stream().append(allPositiveNumbers).take(5) should result in Stream(1,2,3,4,5)   .", function() {
    var allPositiveNumbers = new Stream()
            .generate(1, function(seed){ return seed + 1;});
    var emptyStream = new Stream();
    
    expect(emptyStream.append(allPositiveNumbers).take(5).toArray()).toEqual([1,2,3,4,5]); 
  });  
  
  it("allPositiveNumbers.append(Stream(4,5,6)).take(5) should result in Stream(1,2,3,4,5)   .", function() {
    var allPositiveNumbers = new Stream()
            .generate(1, function(seed){ return seed + 1;});
    var emptyStream = new Stream(4,5,6);
    
    expect(allPositiveNumbers.append(emptyStream).take(5).toArray()).toEqual([1,2,3,4,5]); 
  });    

 
});
