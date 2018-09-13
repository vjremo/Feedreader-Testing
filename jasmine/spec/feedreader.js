/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    //This test suite verifies existence of name and content for each feed source
    describe('RSS Feeds', function() {
        //Verifies if allFeeds contains atleast one feed
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //Loops through allFeeds, checks if the feed exists and contains URL
         it('contain valid URL', function() {
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            }
        });
        //Loops through allFeeds, checks if the feed exists and is named
        it('have valid name', function() {
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            }
        });
    });


    /*Refered Link - https://matthewcranford.com/feed-reader-walkthrough-part-3-menu-test-suite/
    for part of below */
    //This suites tests functionality of "The menu" 
    describe('The Menu', function() {
         
        //This tests verifies if the menu element is collapsed by default
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* This test checks if the Menu is displayed upon click 
         * and is hidden after another click */
         it('can be opened and closed', function () {
             const menuIcon = document.querySelector('.menu-icon-link');
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBe(false);
             menuIcon.click();
             expect($('body').hasClass('menu-hidden')).toBeTruthy();
         } );
    });

    /* This test verifies if there is at least
    * a single .entry element within the .feed container 
    * when the loadFeed function is called and executed .*/
    describe('Initial Entries', function() {
        
        //Loads an feed prior to test
        beforeEach(function(done){
            loadFeed(0, done);
        });
        //Verifies if feed element is not empty and contains at least one element of class 'entry'
        it('contain atleast one feed', function(){
           const feedContainer = $('.feed');
           expect(feedContainer.length).not.toBe(0);
           expect(feedContainer.find('article.entry').length).not.toBe(0); 
        });
    });

    
    // This suit tests selection new RSS feed
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        let firstFeedHTML  , nextFeedHTML ;

        /* Load the feed twice before test 
        * using asynchronus function loadFeed() 
        * store feed's html in respective variables
        */
        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeedHTML = feed.innerHTML;
            });

            loadFeed(1, function(){
                nextFeedHTML = feed.innerHTML;
                done();
            });
        });
        
        it('feed content changes', function(){
            /*This test checks if content of new feed loaded
            * by the loadFeed function is different than previous feed.*/
            expect(nextFeedHTML===firstFeedHTML).toBe(false);
        });
    });
}());
