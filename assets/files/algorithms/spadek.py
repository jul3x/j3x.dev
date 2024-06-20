import sys

def min_cost_to_build_power_line(x, l, n, cities):
    # Dynamic programming with O(n * l) complexity
    # May be optimized with deque probably
    cities.sort()
    
    dp = [float('inf')] * (x + 1)
    for i in range(0, l + 1):
        dp[i] = 0  # Cost to start without any transformer is zero

    for a, b, c in cities:
        for i in range(a, b + 1):
            for j in range(0, l + 1):
                new_idx = i + j
                if new_idx > x:
                    break
                dp[new_idx] = min(dp[i] + c, dp[new_idx])

    return dp[x]

if __name__ == '__main__':
    input_data = sys.stdin.read().strip().split('\n')
    
    x, l, n = map(int, input_data[0].strip().split())
    
    cities = []
    for line in input_data[1:]:
        if line.strip():
            a, b, c = map(int, line.strip().split())
            cities.append((a, b, c))
    
    result = min_cost_to_build_power_line(x, l, n, cities)
    print(result)
