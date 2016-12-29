var cheerio = require('cheerio');

function filterChapters(html){
	var $ = cheerio.load(html)
	var chapters = $('.chapter');

	var courseData = [];
	chapters.each(function(item){
		var chapter = $(this)
		var chapterTitle = chapter.find('strong').text().replace(/\s+/g, '')
		var videos = chapter.find('.video').children('li');
		var chapterData = {
			chapterTitle:chapterTitle,
			videos:[]
		};
		videos.each(function(item){
			var video = $(this).find('.J-media-item');
			var videoTitle = video.text().replace(/\s+/g, '');
			var id = video.attr('href').split('video/')[1];
			chapterData.videos.push({
				title:videoTitle,
				id:id
			})
		})
		courseData.push(chapterData);
	})
	return courseData;
}

function printCourseInfo(courseData){
	courseData.forEach(function(item){
		var chapterTitle = item.chapterTitle;
		console.log(chapterTitle + '\n');
		item.videos.forEach(function(video){
			console.log(`【 ${video.id} 】${video.title}\n`)
		})
	})
}

exports.printCourseInfo = printCourseInfo;
exports.filterChapters = filterChapters;