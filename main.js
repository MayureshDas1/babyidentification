 objects = []; 
statuss = ""; 
play = "";
function preload()
{ 
    play = loadSound("ringing_old_phone.mp3")
 } 
 function setup() 
 {
      canvas = createCanvas(380, 380); 
      canvas.center(); 
      video = createCapture(VIDEO); 
      video.size(380,380); 
      video.hide(); 
      objectDetector = ml5.objectDetector('cocossd', modelLoaded);
       document.getElementById("status").innerHTML = "Status : Detecting Baby";
     } 
     
     function modelLoaded()
     {
          console.log("Model Loaded!")
           statuss = true; 
        }

        function gotResult(error, results) 
        { 
            if (error) 
            { 
                console.log(error);
             } 
             console.log(results); 
             objects = results;
             }

function draw() 
{ image(video, 0, 0, 380, 380);
          r = random(255);
           g = random(255);
            b = random(255); 
            objectDetector.detect(video, gotResult);
             for (i = 0; i < objects.length; i++) 
             { 
                 document.getElementById("status").innerHTML = "Status : Object Detected";
                  fill(r,g,b);
                   percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                     noFill(); 
                     stroke(r,g,b);
                      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                      if(objects[i].label == "person")
                     {
                        play.stop()
                        document.getElementById("numb_object").innerHTML = "Baby is detected"
                     }

                     else if(objects[i].label != "person")
                     {
                         play.play()
                         document.getElementById("numb_object").innerHTML = "Baby is not detected"

                     }

                     }
                     if(objects.length < 0 )
                     {
                        document.getElementById("numb_object").innerHTML = "Baby is not detected"
                        play.play() 
                     }
                     }
                     