package handler

import (
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

// Struct to store form data
type ContactForm struct {
	Name    string
	Email   string
	Subject string
	Message string
}

// Handler function for the serverless function
func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	contact := ContactForm{
		Name:    r.FormValue("name"),
		Email:   r.FormValue("email"),
		Subject: r.FormValue("subject"),
		Message: r.FormValue("message"),
	}

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	senderEmail := os.Getenv("SENDER_EMAIL")
	senderPassword := os.Getenv("SENDER_PASSWORD")
	recipient := "rastagymnastiarpidu27@gmail.com"

	subject := "Subject: " + contact.Subject + "\n"
	body := "You have received a new message from the contact form.\n\n" +
		"Name: " + contact.Name + "\n" +
		"Email: " + contact.Email + "\n" +
		"Subject: " + contact.Subject + "\n" +
		"Message: " + contact.Message
	msg := []byte(subject + body)

	auth := smtp.PlainAuth("", senderEmail, senderPassword, smtpHost)

	err = smtp.SendMail(smtpHost+":"+smtpPort, auth, senderEmail, []string{recipient}, msg)
	if err != nil {
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		log.Printf("Error sending email: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "Email sent successfully!")
}
