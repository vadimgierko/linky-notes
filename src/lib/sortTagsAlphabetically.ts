import { Tags, Tag } from "@/types";

export default function sortTagsAlphabetically(tags: Tags) {
    // const noteTags: ITag[] = Object.keys(note.tags)
    //     .map(tagId => getTagById(tagId))
    //     .filter(t => t !== null) as ITag[]

    /**
     * Converted Tags into `{[key: TAG_VALUE!]: Tag}`
     * to be able to sort by tag values later:
     */
    const tagsValuesObject = Object.values(tags).reduce((prev, curr) => ({ ...prev, [curr.tag]: curr }), {} as { [key: string]: Tag });

    const tagsValuesSortedAlphabetically = Object.keys(tagsValuesObject).toSorted();

    const tagsSortedAlphabetically = tagsValuesSortedAlphabetically
        .map(value => tagsValuesObject[value]).filter(t => t !== null) as Tag[]

    return tagsSortedAlphabetically
}