# classification-evaluator

## Requirements:
- Node
- npm
- Python3, pip3
- Numpy, Cython
- gcc

## Install dependencies:
```bash
npm install
pip3 install numpy cython
cd eval/coco/
make
```
## Run project:
```bash
npm start
```
The webpage would be started on localhost:3000.

## Evaluation
### COCO Object Detection
+ We select coco 2017 Val images for model evaluation. Note that the bbox annotation in coco format is:  
```[xmin, ymin, width, height]```.
+ The required format for evaluation is in json format as follow:  
```[{"image_id":42,"category_id":18,"bbox":[258.15,41.29,348.26,243.78],"score":0.236}, {"image_id":73,"category_id":11,"bbox":[61,22.75,504,609.67],"score":0.318}]```

### Imagenet Image Classification
+ We select a subset of imagenet for model evaluation as imagenet_subset shown.
+ The required format for evaluation is also in json format of {image_name: a list of predicted prob over all categories}, there are 1000 categories.  
```{"n02086910_4488.JPEG": [0.1, 0.01, 0.5, ..., 0.03], "n03201208_7216.JPEG": [0.04, 0.5, 0.1, ..., 0.01]}```

## Docker
For web evaluation: 
1. image: docker pull ff936tw/evaluator:v2
2. run
```
sudo docker run -it --rm -p 3000:3000 ff936tw/evaluator:v2
```
3. open localhost:3000 on browser

## Web app
[Click here](https://nodedockerapp-eval.azurewebsites.net)
