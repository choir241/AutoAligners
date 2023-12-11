# AutoAligners

AutoAligners is a web application that allows users to make appointments for various car services, and receive email notifications when their car(s) are ready for pickup. These notifications are sent manually by the employee user(s), who are given admin level access to certain aspects of the application. There are also other additional elements to the application, such as making PTO requests for employees, purchasing a finance plan, and viewing the overall sales made.

<a href = "https://autoaligners.netlify.app/">

![AutoAligners_Preview](https://github.com/choir27/AutoAligners/assets/66279068/3b83a36b-e6ed-45f3-a6c8-3768e76dd9cb)

</a>

<a href = "https://autoaligners.netlify.app/">Check out the website!</a>

## How It's Made: Tech used: Vite, TypeScript, Appwrite

The logic for the reservation calendar and time slots hub was manually created by me. I did this instead of using the integrated HTML datetime-local type input because the input provided too many options for the user to select from. Looking at it from a perspective from an actual employee that would be working at this auto shop, I wanted to limit the days and times that users would be able to make a reservation so that only businesss hours and days would display. Furthermore, I wanted to be able to customize the time slot display in respect to any current existing appointments, so users would not make any overlapping appointments.

![Reservation_Preview](https://github.com/choir27/AutoAligners/assets/66279068/b30796ec-37e9-4644-ab0b-87ebec0a26b7)

Employee users are created by the main admin account, and one of the main aspects that these users are able to do is not only restock the current inventory items that are in stock, but also sell those inventory items to potential clients. When purchases are made in the application, the current inventory stock amount is updated to reflect this change. Upon making a sale to a client, the purchase history page updates the graphs visually to reflect those new sales, and the employee page has a history of all the sales they personally made, which also updates accordingly. The cart, graphs, and employee sale history all use pagination to handle large amounts of data to decrease the strain of rendering the content.

https://github.com/choir27/AutoAligners/assets/66279068/6e14abc1-b149-4003-9efd-03fd826b8400

As you can see in the above video, changing the quantity of the item in the cart does not update the actual number displaying the quantity of item. This is one of the many elements of this application that still requires work and improvement; however, despite the number visually not reflecting the updated quantity, the respective item does update in the current inventory.

When the car

https://github.com/choir27/car-app-backend
