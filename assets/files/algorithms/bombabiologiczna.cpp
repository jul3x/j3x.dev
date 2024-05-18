#include <cstdio>
#include <algorithm>

using namespace std;

int y[1000000];

int bin_search_left(int l, int p, int x, int r) 
{
 	int sr;
 	int szukana = x - r;
 	
	while(l<=p)
 	{
	    sr = (l + p)/2;
	 
	    if(y[sr] == szukana)
	      	return sr;
	 
	    if(y[sr] > szukana)
	      	p = sr - 1;
	    else
	      	l = sr + 1;
	}
	
	if (y[l] < szukana) return l+1;
	else return l;
}

int bin_search_first_left(int l, int p, int x) 
{
 	int sr;
 	
	while(l<=p)
 	{
	    sr = (l + p)/2;
	 
	    if(y[sr] == x)
	      	return sr;
	 
	    if(y[sr] > x)
	      	p = sr - 1;
	    else
	      	l = sr + 1;
	}
	
	if (y[l] < x) return l+1;
	else return l;
}

int bin_search_right(int l, int p, int x, int r) 
{
 	int sr;
 	int szukana = x + r;
 	
	while(l<=p)
 	{
	    sr = (l + p)/2;
	 
	    if(y[sr] == szukana)
	      	return sr;
	 
	    if(y[sr] > szukana)
	      	p = sr - 1;
	    else
	      	l = sr + 1;
	}
	
	if (y[l] > szukana) return l-1;
	else return l;
}

int bin_search_first_right(int l, int p, int x) 
{
 	int sr;
 	
	while(l<=p)
 	{
	    sr = (l + p)/2;
	 
	    if(y[sr] == x)
	      	return sr;
	 
	    if(y[sr] > x)
	      	p = sr - 1;
	    else
	      	l = sr + 1;
	}
	
	if (y[l] > x) return l-1;
	else return l;
}

int main () {
	int n, m;
	scanf("%d %d", &n, &m);
	
	int x[n], r[n];
	
	for (int i = 0; i < n; i++) 
		scanf("%d %d", &x[i], &r[i]);
		
	for (int i = 0; i < m; i++) 
		scanf ("%d", &y[i]);
		
	sort(y, y+m);
	int wyn = 0;
	for (int i = 0; i < n; i++) {
		if (y[bin_search_first_left(0, m, x[i])] >= x[i]-r[i]) wyn += bin_search_first_left(0, m, x[i]) - bin_search_left(0, m, x[i], r[i]);
		if (y[bin_search_first_right(0, m, x[i])] <= x[i]+r[i]) wyn += bin_search_right(9, m, x[i], r[i] - bin_search_first_right(0, m, x[i]));

		printf ("%d\n", wyn);
	}
	
	return 0;
}
