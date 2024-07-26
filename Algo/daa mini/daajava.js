
    // Function to get input values as arrays
    function getArrayFromInput(id) {
      const input = document.getElementById(id).value;
      return input.split(",").map(num => parseInt(num));
    }

    // Function to display results
    function displayResult(id, result) {
      document.getElementById(id).innerText = `Result: ${result}`;
    }

    // Function to calculate Fibonacci
    function calculateFibonacci() {
      const n = parseInt(document.getElementById('fibInput').value);
      const result = fibonacci(n);
      displayResult('fibResult', result);
    }

    // Function to calculate Coin Change
    function calculateCoinChange() {
      const coins = getArrayFromInput('coinInput');
      const amount = parseInt(document.getElementById('amountInput').value);
      const result = countWays(coins, amount);
      displayResult('coinResult', result);
    }

    // Function to calculate Knapsack
    function calculateKnapsack() {
      const val = getArrayFromInput('valInput');
      const wt = getArrayFromInput('wtInput');
      const W = parseInt(document.getElementById('WInput').value);
      const result = knapSack(W, wt, val, val.length);
      displayResult('knapResult', result);
    }

    // Function to calculate Matrix Multiplication
    function calculateMatrix() {
      const dimensions = getArrayFromInput('matrixInput');
      const result = matrixChainOrder(dimensions);
      displayResult('matrixResult', result);
    }

    // Dynamic Programming algorithms

    // Fibonacci
    function fibonacci(n) {
      if (n <= 1) {
        return n;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    // Coin Change
    function countWays(coins, amount) {
      const dp = new Array(amount + 1).fill(0);
      dp[0] = 1;
      for (let i = 0; i < coins.length; i++) {
        for (let j = coins[i]; j <= amount; j++) {
          dp[j] += dp[j - coins[i]];
        }
      }
      return dp[amount];
    }
    // 0/1 Knapsack
    function knapSack(W, wt, val, n) {
      const dp = new Array(n + 1).fill(0).map(() => new Array(W + 1).fill(0));
      for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= W; j++) {
          if (wt[i - 1] > j) {
            dp[i][j] = dp[i - 1][j];
          } else {
            dp[i][j] = Math.max(dp[i - 1][j], val[i - 1] + dp[i - 1][j - wt[i - 1]]);
          }
        }
    }
    return dp[n][W];
}
    // Matrix Chain Multiplication
    function matrixChainOrder(p) {
      const n = p.length - 1;
      const m = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
      for (let i = 1; i <= n; i++) {
        m[i][i] = 0;
      }
      for (let l = 2; l <= n; l++) {
        for (let i = 1; i <= n - l + 1; i++) {
          let j = i + l - 1;
          m[i][j] = Infinity;
          for (let k = i; k <= j - 1; k++) {
            const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
            if (q < m[i][j]) {
              m[i][j] = q;
            }
          }
        }
      }
      return m[1][n];   
    }