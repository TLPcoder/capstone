'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('courses').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('courses').insert({
            id: 1,
            name: 'Green Hills Country Club',
            description:'The Course at Green Hills was designed by famed architect Dr. Alister MacKenzie, who designed over 100 golf courses - three of such high caliber they are ranked in the world’s top 20 - Cypress Point (Pebble Beach CA), Royal Melbourne (Melbourne, Australia), and Augusta National (Augusta GA), site of the Masters.',
            image:'http://www.greenhillscc.com/SiteDesign/Images/editable_img.aspx',
            address:'500 Ludeman Lane',
            city:'Millbrae',
            country:'United States',
            state:'California',
            zip:94030
        }),
        knex('courses').insert({
            id: 2,
            name: 'Staford',
            description:"Stanford Golf Course was designed in 1930 by renowned golf course architects William Bell and George C. Thomas. Located in the foothills above the Stanford University Campus, the golf course is consistently rated one of the finest courses in the world. In 2009 Stanford was rated the nation's 3rd best college course by golf coaches.",
            image:'https://golfcourse.stanford.edu/images_Dost/Dost12a1000.jpg',
            address:'91 Links Rd.',
            city:'Stanford',
            country:'United States',
            state:'California',
            zip:94304
        }),
        knex('courses').insert({
            id: 3,
            name: 'Cypress Point',
            description:"Amongst the world of golf, few courses are as revered as Cypress Point. Cypress Point Golf Course was created by the well renown designer Alister Mackenzie and opened in 1928. Extraordinary and timeless, Alister Mackenzie masterpiece is consistently rated as one of the top 3 golf courses ever created by all major publications. Cypress Point offers natural beauty that is unmatched anywhere. The clandestine approach to Mackenzie's achievement is the reality that he did not over power the natural terrain, allowing the course to take shape organically.",
            image:'http://www.montereypeninsulagolf.com/images/course/cypress_point/cypress_point_golf_club_peninsula.jpg',
            address:'3150 17 Mile Dr',
            city:'Pebble Beach',
            country:'United States',
            state:'California',
            zip:93953
        })
      ]);
    });
};
