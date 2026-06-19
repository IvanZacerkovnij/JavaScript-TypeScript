// Task1
class PrintMachine {
    constructor(fontSize, fontColor, fontFamily) {
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.fontFamily = fontFamily;
    }

    print(text) {
        document.write(
            `<p style="font-size: ${this.fontSize}px; color: ${this.fontColor}; font-family: ${this.fontFamily};">
                ${text}
            </p>`
        );
    }
}

const printer = new PrintMachine(14, "blue", "Arial");
printer.print("Hello World!");


// Task2
class News {
    constructor(header, text, tags, publishedDate) {
        this.header = header;
        this.text = text;
        this.tags = tags;
        this.publishedDate = publishedDate;
    }

    print() {
        document.body.insertAdjacentHTML("beforeend", this.getHTML());
    }

    getHTML() {
        return `
            <div>
                <h1>${this.header}</h1>
                <p>${this.#dateText()}</p>
                <p>${this.text}</p>
                <p>${this.tags.map(tag => `#${tag}`).join(" ")}</p>
            </div>
            <hr>
        `;
    }

    #dateText() {
        let today = new Date();
        let published = new Date(this.publishedDate);

        today.setHours(0, 0, 0, 0);
        published.setHours(0, 0, 0, 0);

        const diffMs = today - published;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (diffDays === 0) {
            return "today";
        }

        if (diffDays === 1) {
            return "yesterday";
        }

        if (diffDays > 1 && diffDays < 7) {
            return `${diffDays} days ago`;
        }

        if (diffDays >= 7) {
            return this.publishedDate;
        }

        return "future date";
    }
}


// Task3
class NewsLine {
    #news;

    constructor(news = []) {
        this.#news = news;
    }

    get count() {
        return this.#news.length;
    }

    print() {
        document.body.insertAdjacentHTML("beforeend", "<h2>News line</h2>");

        for (let item of this.#news) {
            item.print();
        }
    }

    addNews(news) {
        this.#news.push(news);
    }

    removeFirstNews() {
        this.#news.shift();
    }

    sortByTime() {
        this.#news.sort((a, b) => {
            return new Date(b.publishedDate) - new Date(a.publishedDate);
        });
    }

    getNewsByTag(tag) {
        return this.#news.filter(news => news.tags.includes(tag));
    }

    printNewsByTag(tag) {
        const filteredNews = this.getNewsByTag(tag);

        for (let item of filteredNews) {
            item.print();
        }
    }
}


const news1 = new News(
    "JavaScript News",
    "Today we learned about classes and private methods.",
    ["js", "oop", "frontend"],
    "2026-06-14"
);

const news2 = new News(
    "Frontend Update",
    "We learned how to work with DOM.",
    ["frontend", "html", "css"],
    "2026-06-18"
);

const news3 = new News(
    "OOP in JS",
    "Classes can have private fields and methods.",
    ["js", "oop"],
    "2026-06-19"
);

const newsLine = new NewsLine([news1, news2, news3]);

newsLine.sortByTime();
newsLine.print();

console.log("News count:", newsLine.count);