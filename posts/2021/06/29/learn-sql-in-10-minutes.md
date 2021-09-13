---
date: 2021-6-29
update: 2021-6-29
categories:
  - Computer Science
  - Datebase
tags:
  - SQL
---

# Learn SQL in 10 Minutes

芜湖，好大的名字，不过只是原书部分摘抄 :blush:

## 分组与聚集函数

### 聚集函数

与函数不同，聚集函数在多数DBMS上兼容，主要有MAX, MIN, SUM, AVG五个
- 多数聚集函数都会忽略值为NULL的行，包括MAX, MIN, SUM, AVG
- 如果不指定列名COUNT(*)会计算所有列，但如果指定列名COUNT(COLUMN_NAME)则会忽略该列中为NULL值的行

### HAVING与WHERE

HAVING 和 WHERE 非常相识，如果不指定 GROUP BY ，多数 DBMS 同等对待它们。不过，你需要区分它们，HAVING 应结合 GROUP BY，而 WHERE 用于标准的行级过滤。

对于二者的区别，最简单的解释是 WHERE 在 GROUP 前过滤，而 HAVING 在 GROUP 后过滤，也就是说 WHERE 排除的行不被包括在 GROUP 内。考虑下列代码：

```sql
SELECT vend_id, COUNT(*) AS num_prods
FROM Products
WHERE prod_price >= 4
GROUP BY vend_id
HAVING COUNT(*) >= 2
```

这一段代码中，WHERE 无法代替 HAVING 的功能，因为其生效于分组前。

## SELECT语句顺序

```sql
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
```

## 联结

### 自联结

自联结当然就是和自己联结啦，通常用子查询也能完成：

```sql
SELECT cust_id, cust_name, cust_contact
FROM Customers
WHERE cust_name = (SELECT cust_name
                   FROM Customers
                   WHERE cust_contact = 'Jim Jones');
```

换成自联结后代码明了许多，不过要记得给表加别名：

```sql
SELECT c1.cust_id, c1.cust_name, c1.cust_contact
FROM Customers AS c1, Customers AS c2
WHERE c1.cust_name = c2.cust_name
 AND c2.cust_contact = 'Jin Jones';
```

自联结不仅仅是语法上清晰，而且性能往往比子查询好，许多 DBMS 处理联结远比处理子查询快得多。

### 内联结和外联结

内联结（Inner Join）又称等值联结（Equijoin），标准写法如下：

```sql
SELECT vend_name, prod_name, prod_price
FROM Vendors
INNER JOIN Products ON Vendors.vend_id = Products.vend_id;
```

不过你也可以用一个更简单的写法：

```sql
SELECT vend_name, prod_name, prod_price
FROM Vendors, Products
WHERE Vendors.vend_id = Products.vend_id;
```

这一写法非常有趣，尤其是当你忘记写 WHERE 子句时候，将会创造一个笛卡尔积（M*N，其中M表示左表行数，N表示右表行数）。

::: tip 是否使用缩写？

SQL中存在好多缩写，除了内联结，还有 GROUP BY 等子句的列名可以用列序号代替。不过，缩写常常会带来一些其他问题，比如降低了可维护性，当你修改列顺序后还需要同步修改子句，或者是上文提到的漏掉 WHERE 子句后，会带来巨大的性能损耗，并且往往得不到提示。

除了缩写，还有使用函数也会导致可移植性的降低，性能与便捷不可兼得， 取性能而舍便捷也。不过一切随你，毕竟我们不是警察 :policeman:

:::

外联结（Outer Join）可以分为 LEFT OUTER JOIN、RIGHT OUTER JOIN和FULL OUTER JOIN，三者的主要区别在于当存在两表中存在另一个表中不存在的数据时的联结策略。左联结时将以左表数据为准联结右表，也就是左表中存在而右表中不存在的数据不会被包含在联结表中，右联结则相反，全联结表中两侧数据都会存在，因此全联结表中字段类型都是 Nullable 的。

### 自然联结

自然联结更像是一个语法糖，其会将两个表中具有相同名称、相同值类型的公共字段自然而然的联结在一起，而不需要联结的限定条件。

```sql
SELECT p.*,v.*
FROM productinfo AS p NATURAL JOIN vendors AS v
```

### 带聚集函数的联结

```sql
SELECT Customers.cust_id
       COUNT(Orders.order_num) AS num_ord
FROM Customers
 LEFT OUTER JOIN Orders ON Customers.cust_id = Orders.cust_id
GROUP BY Customers.cust_id
```

## Reference

- Ben Forta. Sams Teach Yourself SQL in 10 Minutes