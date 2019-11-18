import json
import sys
import numpy as np
import argparse
parser = argparse.ArgumentParser()
parser.add_argument('--path', '-p', type=str)
arg = parser.parse_args()
# imagenet label
f = open("label.txt","r")
# build label mapping
label_dict = {}
for idx, l in enumerate(f.read().split('\n')):
    label_dict[l.split(' ')[0]] = idx

#results = json.load(open("./results/imagenet_results2_catherine.json", 'r'))
results = json.load(open(arg.path, 'r'))
imagenet_subset = np.load("imagenet_subset.npy")
result_top5 = []
result_top1 = []
n = 5
for img in imagenet_subset:
    if img in results.keys():
        candidate = np.argsort(np.array(results[img]).astype(np.float))[-n:]
        result_top5.append(label_dict[img[:9]] in candidate)
        result_top1.append(label_dict[img[:9]] == candidate[-1])

print("top-1: ", sum(result_top1)/len(result_top1))
print("top-5: ", sum(result_top5)/len(result_top5))
sys.stdout.flush()
