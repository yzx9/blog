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

### 内联结

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

::: tips 是否使用缩写？

SQL中存在好多缩写，除了内联结，还有 GROUP BY 等子句的列名可以用列序号代替。不过，缩写常常会带来一些其他问题，比如降低了可维护性，当你修改列顺序后还需要同步修改子句，或者是上文提到的漏掉 WHERE 子句后，会带来巨大的性能损耗，并且往往得不到提示。

除了缩写，还有使用函数也会导致可移植性的降低，性能与便捷不可兼得， 取性能而舍便捷也。不过一切随你，毕竟我们不是警察 :policeman:

:::

## Reference

- Ben Forta. Sams Teach Yourself SQL in 10 Minutes
