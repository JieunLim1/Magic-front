const dummy = [{"id":"","created":"2024/09/01 00:32:41","updated":"","title":"","owner_id":"","path":"","video":{"id":0,"url":"","source_lang":"","subtitle":[]}},{"id":"14d45758-5234-4beb-9a00-c304bfd1dac2","created":"2024/08/31 15:26:15","updated":"","title":"p2","owner_id":"","video":{"id":"VBoZSbRcfJ4","title":"","url":"https://www.youtube.com/watch?v=VBoZSbRcfJ4","source_lang":"ko","subtitle":[{"text":" 똑같은 하루에서 답답함을 빼면","start":0.13,"end":4.329},{"text":"더 청량해 질 거야 제로처럼","start":4.33,"end":10.33},{"text":" 우리 없어도 되는 건 빼고 살자","start":17.09,"end":22.17},{"text":" 칠성사이다 제로","start":27.202,"end":30.702}]}},{"id":"95d9c7c3-bd4d-4695-bbaf-bea3991de09c","created":"2024/08/31 15:58:43","updated":"","title":"p3","owner_id":"","video":{"id":"VBoZSbRcfJ4","url":"https://www.youtube.com/watch?v=VBoZSbRcfJ4","source_lang":"ko","subtitle":[{"text":" 똑같은 하루에서 답답함을 빼면","start":0.13,"end":4.329},{"text":"더 청량해 질 거야 제로처럼","start":4.33,"end":10.33},{"text":" 우리 없어도 되는 건 빼고 살자","start":17.09,"end":22.17},{"text":" 칠성사이다 제로","start":27.202,"end":30.702}]}}];
const dummmy_json = JSON.parse(dummy);
sort_by_update(dummmy_json);

const sort_by_update = (data) => { // data (json)
    const sortedData = [...data].sort(function (a, b) {
        return new Date(b.created) - new Date(a.created);
    }).reverse();
    console.log(`this is sorted list: ${JSON.stringify(sortedData)}`);
    setSorted(sortedData);
};