import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentTransactions = [
  { hash: "0x1234...5678", from: "0xabcd...efgh", to: "0xijkl...mnop", value: "0.1 ETH" },
  { hash: "0x8765...4321", from: "0xqrst...uvwx", to: "0xyzab...cdef", value: "0.05 ETH" },
  { hash: "0x2468...1357", from: "0xghij...klmn", to: "0xopqr...stuv", value: "0.2 ETH" },
]

export function RecentTransactions() {
  return (
    <Card className="border-primary/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-primary">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Hash</TableHead>
              <TableHead className="text-muted-foreground">From</TableHead>
              <TableHead className="text-muted-foreground">To</TableHead>
              <TableHead className="text-muted-foreground">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((tx) => (
              <TableRow key={tx.hash}>
                <TableCell className="font-medium text-primary">{tx.hash}</TableCell>
                <TableCell>{tx.from}</TableCell>
                <TableCell>{tx.to}</TableCell>
                <TableCell>{tx.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

