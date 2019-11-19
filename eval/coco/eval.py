from pycocotools.coco import COCO
from pycocotools.cocoeval import COCOeval
import numpy as np
from argparse import ArgumentParser

# argument
parser = ArgumentParser()
parser.add_argument('--path', '-p', default='results/coco_val2017_result_catherine_5.json', type=str)
args = parser.parse_args()

annType = 'bbox'      #specify type here
prefix = 'person_keypoints' if annType=='keypoints' else 'instances'

#dataDir='..'
dataType='val2017'
annFile = '%s_%s.json'%(prefix,dataType)
cocoGt=COCO(annFile)

resFile=args.path
cocoDt=cocoGt.loadRes(resFile)
imgIds=sorted(cocoGt.getImgIds())

# running evaluation
cocoEval = COCOeval(cocoGt,cocoDt,annType)
cocoEval.params.imgIds  = imgIds
cocoEval.evaluate()
cocoEval.accumulate()
cocoEval.summarize()
