---
layout: page
title: Companies
icon: buildings
---

These are the companies that Full Stack has funded. See our [Angel List profile](https://angel.co/fullstackventures) for more details.

<ul class="companies-list">
    {% for c in site.categories.companies %}
    <li>
        <h3><a href="{{ c.website }}" target="_blank"><img src="{{ c.logo }}" class="company-logo" />{{ c.title }}</a></h3>
        {{ c.excerpt }}
    </li>
    {% endfor %}
</ul>
