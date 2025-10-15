class noticias {
    constructor(
        content,
        createdAt,
        imageUri,
        summary,
        title,
    ) {
        this.content = content;
        this.createdAt = createdAt;
        this.imageUri = imageUri;
        this.summary = summary;
        this.title = title;
    }
}

class dicas {
    constructor(
        content,
        description,
        image,
        title,
        sectionTitle,
        sectionText
    ) {
        this.content = content;
        this.description = description;
        this.image = image;
        this.summary = summary;
        this.title = title;
        this.sectionTitle = sectionTitle;
        this.sectionText = sectionText;
    }
}