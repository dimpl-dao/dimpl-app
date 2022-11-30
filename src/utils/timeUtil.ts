export const timediffer = (string:string) => {
    const ago_time = new Date(string).getTime();
    const now_time = new Date().getTime();
    const times = Math.round(now_time - ago_time)/ 1000 / 60
    let time_result;
    
    if (times < 2){
        time_result = '1 min ago'
    } else if (times < 60) {
        time_result = Math.round(times).toString() + ' mins ago'
    } else if (times < 120) {
        time_result = '1 hour ago'
    } else if (times < 1440) {
        time_result = Math.round(times/60) + ' hours ago'
    } else if (times < 2880){
        time_result = 'One day ago'
    } else if (times < 4340){
        time_result = 'Two days ago'
    } else {
        time_result = Math.round(times/60/24) + ' days ago'
    }
    return time_result
};