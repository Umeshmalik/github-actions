import collections 
def solve(A, B): 
	inp=input()
	print(inp)
	mp = collections.Counter(A) 
	i = 0 
	j = len(A) - 1 
	cnt = 0 
	mp1 = collections.Counter(B[i:j+1]) 
	while j < len(B): 
		if mp1 == mp: 
			cnt += 1 
		j += 1 
		i += 1 
		if j < len(B): 
			if mp1[B[i-1]] == 1: 
				del mp1[B[i-1]] 
			else: 
				mp1[B[i-1]] -= 1 
			mp1[B[j]] = 1 if not mp1[B[j]] else mp1[B[j]] + 1 
	return [cnt, inp] 
A = 'aca' 
B = 'acaa' 
print(solve(A, B))